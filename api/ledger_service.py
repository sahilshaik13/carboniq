"""
Carbon Credit Ledger with Hash Chain Verification
Phase 3 blockchain integration for verifiable carbon credits
"""

from datetime import datetime
from typing import List, Dict, Any
import hashlib
import json
from dataclasses import dataclass, asdict


@dataclass
class CreditEntry:
    """Represents a carbon credit entry in the ledger.
    
    Each entry is part of an immutable hash chain for verification.
    """

    user_id: str
    amount_kg_co2e: float
    activity_id: str
    timestamp: str
    previous_hash: str
    transaction_type: str  # "earned", "traded", "retired"
    metadata: Dict[str, Any]

    def compute_hash(self) -> str:
        """Compute SHA256 hash of this entry for chain verification.
        
        Returns:
            str: SHA256 hex digest of the entry
        """
        entry_str = json.dumps(asdict(self), sort_keys=True)
        return hashlib.sha256(entry_str.encode()).hexdigest()


class CarbonCreditLedger:
    """Manages verifiable carbon credits with hash chain verification.
    
    Maintains an immutable ledger of all carbon credit transactions with
    SHA256 hash chain for integrity verification.
    """

    def __init__(self) -> None:
        """Initialize empty ledger with genesis block."""
        self.entries: List[CreditEntry] = []
        self.last_hash: str = "0" * 64  # Genesis block

    def add_earned_credits(
        self, user_id: str, amount_kg_co2e: float, activity_id: str, metadata: Dict[str, Any] = None
    ) -> CreditEntry:
        """Record earned carbon credits from an activity.
        
        Args:
            user_id: User ID earning credits
            amount_kg_co2e: Amount of emissions offset in kg CO2e
            activity_id: Associated activity ID
            metadata: Optional additional data
            
        Returns:
            CreditEntry: Created credit entry
        """
        entry = CreditEntry(
            user_id=user_id,
            amount_kg_co2e=amount_kg_co2e,
            activity_id=activity_id,
            timestamp=datetime.utcnow().isoformat(),
            previous_hash=self.last_hash,
            transaction_type="earned",
            metadata=metadata or {},
        )

        self.entries.append(entry)
        self.last_hash = entry.compute_hash()
        return entry

    def retire_credits(self, user_id: str, amount_kg_co2e: float, reason: str) -> CreditEntry:
        """Retire carbon credits (offset verification).
        
        Args:
            user_id: User ID retiring credits
            amount_kg_co2e: Amount to retire
            reason: Reason for retirement
            
        Returns:
            CreditEntry: Retirement entry with negative amount
        """
        entry = CreditEntry(
            user_id=user_id,
            amount_kg_co2e=-amount_kg_co2e,  # Negative for retirement
            activity_id="",
            timestamp=datetime.utcnow().isoformat(),
            previous_hash=self.last_hash,
            transaction_type="retired",
            metadata={"reason": reason},
        )

        self.entries.append(entry)
        self.last_hash = entry.compute_hash()
        return entry

    def trade_credits(
        self, from_user: str, to_user: str, amount_kg_co2e: float, price: float = None
    ) -> tuple[CreditEntry, CreditEntry]:
        """Trade credits between users with full chain tracking.
        
        Args:
            from_user: Sender user ID
            to_user: Receiver user ID
            amount_kg_co2e: Amount of credits to trade
            price: Optional transaction price per credit
            
        Returns:
            Tuple of (outgoing_entry, incoming_entry)
        """
        # Outgoing for sender
        outgoing = CreditEntry(
            user_id=from_user,
            amount_kg_co2e=-amount_kg_co2e,
            activity_id="",
            timestamp=datetime.utcnow().isoformat(),
            previous_hash=self.last_hash,
            transaction_type="traded",
            metadata={"direction": "out", "to_user": to_user, "price": price},
        )
        self.entries.append(outgoing)
        self.last_hash = outgoing.compute_hash()

        # Incoming for receiver
        incoming = CreditEntry(
            user_id=to_user,
            amount_kg_co2e=amount_kg_co2e,
            activity_id="",
            timestamp=datetime.utcnow().isoformat(),
            previous_hash=self.last_hash,
            transaction_type="traded",
            metadata={"direction": "in", "from_user": from_user, "price": price},
        )
        self.entries.append(incoming)
        self.last_hash = incoming.compute_hash()

        return outgoing, incoming

    def get_user_balance(self, user_id: str) -> float:
        """Calculate total carbon credits for a user.
        
        Args:
            user_id: User ID to calculate balance for
            
        Returns:
            float: Net carbon credits (earned - retired - traded away + traded in)
        """
        balance = 0.0
        for entry in self.entries:
            if entry.user_id == user_id:
                balance += entry.amount_kg_co2e
        return balance

    def get_user_history(self, user_id: str) -> List[Dict[str, Any]]:
        """Get transaction history for a user.
        
        Args:
            user_id: User ID to retrieve history for
            
        Returns:
            List of transaction dictionaries with full entry details
        """
        return [asdict(entry) for entry in self.entries if entry.user_id == user_id]

    def verify_chain(self) -> bool:
        """Verify integrity of the hash chain.
        
        Returns:
            bool: True if chain is valid, False if tampered
        """
        current_hash = "0" * 64
        for entry in self.entries:
            if entry.previous_hash != current_hash:
                return False
            computed_hash = entry.compute_hash()
            # Note: In real implementation, we'd store the hash with the entry
            current_hash = computed_hash
        return True

    def export_ledger(self, user_id: str = None) -> List[Dict[str, Any]]:
        """Export ledger entries (optionally filtered by user).
        
        Args:
            user_id: Optional user ID to filter entries
            
        Returns:
            List of ledger entries as dictionaries
        """
        entries = self.entries if not user_id else [e for e in self.entries if e.user_id == user_id]
        return [asdict(entry) for entry in entries]


# Global ledger instance
ledger = CarbonCreditLedger()


# Helper functions for API
def calculate_credits_earned(emissions_kg_co2e: float) -> float:
    """Calculate carbon credits earned from emissions.
    
    Args:
        emissions_kg_co2e: Emissions offset in kg CO2e
        
    Returns:
        float: Credits earned (1 kg CO2e = 1 credit, minimum 0)
    """
    return max(0, emissions_kg_co2e)  # Only positive offsets count


def get_marketplace_stats() -> Dict[str, Any]:
    """Get global carbon credit marketplace statistics.
    
    Returns:
        Dictionary with circulation, trading volume, retirement data, and chain validity
    """
    all_entries = ledger.entries

    traded = sum(abs(e.amount_kg_co2e) for e in all_entries if e.transaction_type == "traded")
    retired = sum(abs(e.amount_kg_co2e) for e in all_entries if e.transaction_type == "retired")
    earned = sum(e.amount_kg_co2e for e in all_entries if e.transaction_type == "earned")

    return {
        "total_credits_in_circulation": earned - traded - retired,
        "total_traded": traded,
        "total_retired": retired,
        "average_price_per_credit": 5.0,  # Mock price
        "verified_transactions": len(all_entries),
        "chain_valid": ledger.verify_chain(),
    }
