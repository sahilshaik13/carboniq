"""
OCR Service for extracting emissions data from utility bills
Phase 2 integration with Google Document AI
"""

import os
from typing import Optional, Dict, Any
from datetime import datetime

# Mock OCR implementation - Phase 2 will integrate with Google Document AI


class OCRService:
    """Service for processing documents and extracting emissions data"""

    def __init__(self):
        # In Phase 2, initialize Google Document AI client
        self.initialized = False
        if os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
            self.initialized = True

    async def process_utility_bill(self, file_path: str) -> Dict[str, Any]:
        """Process a utility bill and extract emissions data"""
        if not self.initialized:
            return self._mock_bill_extraction()

        # Phase 2: Use Google Document AI
        # This will extract:
        # - Energy consumption (kWh)
        # - Gas consumption (m3)
        # - Period covered
        # - Provider information

        return self._mock_bill_extraction()

    async def process_receipt(self, file_path: str) -> Dict[str, Any]:
        """Process a receipt and extract food/purchase data"""
        if not self.initialized:
            return self._mock_receipt_extraction()

        # Phase 2: Extract:
        # - Product categories
        # - Quantities
        # - Estimate emissions based on products

        return self._mock_receipt_extraction()

    def _mock_bill_extraction(self) -> Dict[str, Any]:
        """Mock utility bill extraction"""
        return {
            "document_type": "utility_bill",
            "provider": "Electric Company",
            "period_start": "2024-05-01",
            "period_end": "2024-05-31",
            "consumption": {
                "type": "electricity",
                "amount": 450,
                "unit": "kWh",
            },
            "emissions_estimated_kg_co2e": 187.0,  # 450 kWh * 0.415 factor
            "confidence": 0.92,
        }

    def _mock_receipt_extraction(self) -> Dict[str, Any]:
        """Mock receipt extraction"""
        return {
            "document_type": "receipt",
            "merchant": "Grocery Store",
            "date": datetime.now().isoformat(),
            "items": [
                {"name": "Chicken Breast", "quantity": 2, "unit": "kg", "category": "meat_chicken"},
                {"name": "Vegetables", "quantity": 3, "unit": "kg", "category": "vegetables"},
            ],
            "emissions_estimated_kg_co2e": 18.5,
            "confidence": 0.85,
        }


# Initialize service
ocr_service = OCRService()


async def extract_and_log_activity(file_path: str, document_type: str = "utility_bill"):
    """Extract data from document and create activity log"""
    if document_type == "utility_bill":
        result = await ocr_service.process_utility_bill(file_path)
    elif document_type == "receipt":
        result = await ocr_service.process_receipt(file_path)
    else:
        raise ValueError(f"Unsupported document type: {document_type}")

    return result
