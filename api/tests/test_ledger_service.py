"""
Test suite for carbon credit ledger and hash chain verification
Tests that the hash chain maintains consistency across transactions
"""

import sys
from pathlib import Path

# Add api directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from ledger_service import CarbonCreditLedger, CreditEntry


class TestCarbonCreditLedger:
    """Test suite for carbon credit ledger functionality"""

    def test_ledger_initialization(self):
        """Test that ledger initializes correctly"""
        ledger = CarbonCreditLedger()
        assert len(ledger.entries) == 0, "New ledger should have no entries"
        assert ledger.last_hash == "0" * 64, "Genesis hash should be 64 zeros"

    def test_add_earned_credits(self):
        """Test adding earned credits to ledger"""
        ledger = CarbonCreditLedger()
        entry = ledger.add_earned_credits(
            user_id="user123",
            amount_kg_co2e=100.0,
            activity_id="activity456",
            metadata={"source": "transport"},
        )

        assert len(ledger.entries) == 1, "Ledger should contain 1 entry"
        assert entry.user_id == "user123", "User ID should match"
        assert entry.amount_kg_co2e == 100.0, "Amount should match"
        assert entry.transaction_type == "earned", "Transaction type should be earned"

    def test_hash_chain_consistency_single_entry(self):
        """Test that hash chain is consistent with single entry"""
        ledger = CarbonCreditLedger()
        initial_hash = ledger.last_hash

        ledger.add_earned_credits("user123", 100.0, "activity1")
        entry = ledger.entries[0]

        assert entry.previous_hash == initial_hash, "Entry previous_hash should equal genesis hash"
        assert ledger.last_hash != initial_hash, "Ledger hash should update after entry"

    def test_hash_chain_consistency_multiple_entries(self):
        """Test that hash chain is consistent across multiple entries"""
        ledger = CarbonCreditLedger()

        # Add first entry
        entry1 = ledger.add_earned_credits("user123", 100.0, "activity1")
        hash_after_first = ledger.last_hash

        # Add second entry
        entry2 = ledger.add_earned_credits("user456", 50.0, "activity2")
        hash_after_second = ledger.last_hash

        # Verify chain consistency
        assert entry1.previous_hash == "0" * 64, "First entry should reference genesis"
        assert entry2.previous_hash == hash_after_first, "Second entry should reference first entry's hash"
        assert hash_after_first != hash_after_second, "Hash should change after each entry"

    def test_retire_credits(self):
        """Test retiring carbon credits"""
        ledger = CarbonCreditLedger()
        entry = ledger.retire_credits("user123", 50.0, "offset_action")

        assert entry.amount_kg_co2e == -50.0, "Retired credits should be negative"
        assert entry.transaction_type == "retired", "Transaction type should be retired"
        assert entry.metadata["reason"] == "offset_action", "Reason should be stored"

    def test_trade_credits(self):
        """Test trading credits between users"""
        ledger = CarbonCreditLedger()

        # First, add earned credits
        ledger.add_earned_credits("user1", 200.0, "activity1")

        # Trade credits
        outgoing, incoming = ledger.trade_credits("user1", "user2", 50.0, price=5.0)

        assert outgoing.amount_kg_co2e == -50.0, "Outgoing should be negative"
        assert incoming.amount_kg_co2e == 50.0, "Incoming should be positive"
        assert outgoing.user_id == "user1", "Outgoing user should be user1"
        assert incoming.user_id == "user2", "Incoming user should be user2"

    def test_get_user_balance_earned_only(self):
        """Test balance calculation with only earned credits"""
        ledger = CarbonCreditLedger()
        ledger.add_earned_credits("user123", 100.0, "activity1")
        ledger.add_earned_credits("user123", 50.0, "activity2")

        balance = ledger.get_user_balance("user123")
        assert balance == 150.0, f"Expected 150.0, got {balance}"

    def test_get_user_balance_with_retirement(self):
        """Test balance calculation with earned and retired credits"""
        ledger = CarbonCreditLedger()
        ledger.add_earned_credits("user123", 100.0, "activity1")
        ledger.retire_credits("user123", 30.0, "offset")

        balance = ledger.get_user_balance("user123")
        assert balance == 70.0, f"Expected 70.0, got {balance}"

    def test_get_user_balance_multiple_users(self):
        """Test that balance is isolated per user"""
        ledger = CarbonCreditLedger()
        ledger.add_earned_credits("user1", 100.0, "activity1")
        ledger.add_earned_credits("user2", 200.0, "activity2")

        balance1 = ledger.get_user_balance("user1")
        balance2 = ledger.get_user_balance("user2")

        assert balance1 == 100.0, f"User1 balance should be 100.0, got {balance1}"
        assert balance2 == 200.0, f"User2 balance should be 200.0, got {balance2}"

    def test_verify_chain_empty_ledger(self):
        """Test chain verification on empty ledger"""
        ledger = CarbonCreditLedger()
        assert ledger.verify_chain() is True, "Empty ledger should be valid"

    def test_verify_chain_with_entries(self):
        """Test chain verification with valid entries"""
        ledger = CarbonCreditLedger()
        ledger.add_earned_credits("user123", 100.0, "activity1")
        ledger.add_earned_credits("user456", 50.0, "activity2")
        ledger.retire_credits("user123", 30.0, "offset")

        # Chain should be valid
        assert ledger.verify_chain() is True, "Valid chain should verify"

    def test_get_user_history(self):
        """Test retrieving user transaction history"""
        ledger = CarbonCreditLedger()
        ledger.add_earned_credits("user123", 100.0, "activity1")
        ledger.add_earned_credits("user456", 50.0, "activity2")
        ledger.retire_credits("user123", 30.0, "offset")

        history = ledger.get_user_history("user123")

        assert len(history) == 2, "User123 should have 2 transactions"
        assert history[0]["transaction_type"] == "earned", "First should be earned"
        assert history[1]["transaction_type"] == "retired", "Second should be retired"

    def test_export_ledger_all_entries(self):
        """Test exporting all ledger entries"""
        ledger = CarbonCreditLedger()
        ledger.add_earned_credits("user1", 100.0, "activity1")
        ledger.add_earned_credits("user2", 50.0, "activity2")

        export = ledger.export_ledger()

        assert len(export) == 2, "Export should contain 2 entries"

    def test_export_ledger_filtered_by_user(self):
        """Test exporting ledger entries filtered by user"""
        ledger = CarbonCreditLedger()
        ledger.add_earned_credits("user1", 100.0, "activity1")
        ledger.add_earned_credits("user2", 50.0, "activity2")
        ledger.add_earned_credits("user1", 75.0, "activity3")

        export = ledger.export_ledger(user_id="user1")

        assert len(export) == 2, "Export should contain 2 entries for user1"
        for entry in export:
            assert entry["user_id"] == "user1", "All entries should belong to user1"

    def test_complex_transaction_sequence(self):
        """Test complex sequence with earned, traded, and retired credits"""
        ledger = CarbonCreditLedger()

        # User1 earns credits
        ledger.add_earned_credits("user1", 500.0, "activity1")

        # User1 trades some to User2
        ledger.trade_credits("user1", "user2", 200.0, price=5.0)

        # User2 retires half their credits
        ledger.retire_credits("user2", 100.0, "offset_project")

        # Check final balances
        user1_balance = ledger.get_user_balance("user1")
        user2_balance = ledger.get_user_balance("user2")

        assert user1_balance == 300.0, f"User1 balance should be 300.0, got {user1_balance}"
        assert user2_balance == 100.0, f"User2 balance should be 100.0, got {user2_balance}"

    def test_hash_immutability(self):
        """Test that entry hashes are computed correctly"""
        ledger = CarbonCreditLedger()
        entry1 = ledger.add_earned_credits("user123", 100.0, "activity1")
        hash1_computed = entry1.compute_hash()

        # Compute hash again - should be identical
        hash1_computed_again = entry1.compute_hash()

        assert hash1_computed == hash1_computed_again, "Hash should be deterministic"


if __name__ == "__main__":
    # Allow direct execution for testing
    test_suite = TestCarbonCreditLedger()
    for method_name in dir(test_suite):
        if method_name.startswith("test_"):
            print(f"Running {method_name}...", end=" ")
            try:
                getattr(test_suite, method_name)()
                print("✓")
            except AssertionError as e:
                print(f"✗ {e}")
