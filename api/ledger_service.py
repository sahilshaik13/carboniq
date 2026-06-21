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
    """Represents a carbon credit entry in the ledger"""

    user_id: str
    amount_kg_co2e: float
    activity_id: str
    timestamp: str
    previous_hash: str
    transaction_type: str  # "earned", "traded", "retired"
    metadata: Dict[str, Any]

    def compute_hash(self) -> str:
        """Compute SHA256 hash of this entry"""
        entry_str = json.dumps(asdict(self), sort_keys=True)
        return hashlib.sha256(entry_str.encode()).hexdigest()


class CarbonCreditLedger:
    """Manages verifiable carbon credits with hash chain"""

    def __init__(self):
        self.entries: List[CreditEntry] = []
        self.last_hash = "0" * 64  # Genesis block

    def add_earned_credits(
        self, user_id: str, amount_kg_co2e: float, activity_id: str, metadata: Dict[str, Any] = None
    ) -> CreditEntry:
        """Record earned carbon credits from an activity"""
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
        """Retire carbon credits (offset verification)"""
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
        """Trade credits between users"""
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
        """Calculate total carbon credits for a user"""
        balance = 0.0
        for entry in self.entries:
            if entry.user_id == user_id:
                balance += entry.amount_kg_co2e
        return balance

    def get_user_history(self, user_id: str) -> List[Dict[str, Any]]:
        """Get transaction history for a user"""
        return [asdict(entry) for entry in self.entries if entry.user_id == user_id]

    def verify_chain(self) -> bool:
        """Verify integrity of the hash chain"""
        current_hash = "0" * 64
        for entry in self.entries:
            if entry.previous_hash != current_hash:
                return False
            computed_hash = entry.compute_hash()
            # Note: In real implementation, we'd store the hash with the entry
            current_hash = computed_hash
        return True

    def export_ledger(self, user_id: str = None) -> List[Dict[str, Any]]:
        """Export ledger entries (optionally filtered by user)"""
        entries = self.entries if not user_id else [e for e in self.entries if e.user_id == user_id]
        return [asdict(entry) for entry in entries]


# Global ledger instance
ledger = CarbonCreditLedger()


# Helper functions for API
def calculate_credits_earned(emissions_kg_co2e: float) -> float:
    """Calculate carbon credits earned (1 kg CO2e = 1 credit)"""
    return max(0, emissions_kg_co2e)  # Only positive offsets count


def get_marketplace_stats() -> Dict[str, Any]:
    """Get marketplace statistics"""
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
