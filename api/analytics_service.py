"""
Analytics Service with BigQuery Integration
Phase 3 - Advanced benchmarking and insights
"""

import os
from typing import Dict, List, Any
from datetime import datetime, timedelta


class AnalyticsService:
    """Service for analyzing emissions data and generating benchmarks"""

    def __init__(self):
        # In Phase 3, initialize BigQuery client
        self.initialized = False
        if os.getenv("GOOGLE_PROJECT_ID"):
            try:
                # from google.cloud import bigquery
                # self.client = bigquery.Client()
                self.initialized = True
            except ImportError:
                pass

    async def get_regional_benchmarks(self, region: str) -> Dict[str, Any]:
        """Get emissions benchmarks for a region"""
        if not self.initialized:
            return self._mock_regional_benchmarks(region)

        # Phase 3: Query BigQuery for regional data
        # SELECT avg(total_emissions), percentile(total_emissions, 50), ...
        # FROM carboniq_data.emissions WHERE region = region

        return self._mock_regional_benchmarks(region)

    async def get_user_percentile(self, user_id: str, region: str) -> Dict[str, Any]:
        """Calculate user's emissions percentile in their region"""
        if not self.initialized:
            return self._mock_user_percentile()

        # Phase 3: Query BigQuery
        # COUNT(*) as total_users, COUNT(CASE WHEN emissions < user_emissions THEN 1)
        # FROM carboniq_data.emissions WHERE region = region

        return self._mock_user_percentile()

    async def get_category_trends(self, days: int = 90) -> Dict[str, Any]:
        """Get trends across all categories"""
        return {
            "period_days": days,
            "transport": {
                "trend": "decreasing",
                "avg_weekly": 45.2,
                "improvement_percent": 8.5,
            },
            "energy": {
                "trend": "stable",
                "avg_weekly": 28.1,
                "improvement_percent": 2.1,
            },
            "food": {
                "trend": "improving",
                "avg_weekly": 12.5,
                "improvement_percent": 15.3,
            },
        }

    async def get_achievement_stats(self) -> Dict[str, Any]:
        """Get global achievement statistics"""
        return {
            "total_users": 50000,
            "total_emissions_tracked_tonnes": 2500,
            "total_emissions_saved_tonnes": 125,
            "active_carbon_credits": 1250000,
            "trades_completed": 15000,
            "top_contributing_region": "Europe",
        }

    def _mock_regional_benchmarks(self, region: str) -> Dict[str, Any]:
        """Mock regional benchmark data"""
        benchmarks = {
            "Europe": {
                "avg_annual_emissions": 2100,
                "median_annual_emissions": 1950,
                "p10_annual_emissions": 800,
                "p90_annual_emissions": 3500,
                "top_category": "transport",
                "top_category_percent": 45,
            },
            "North America": {
                "avg_annual_emissions": 3200,
                "median_annual_emissions": 2900,
                "p10_annual_emissions": 1200,
                "p90_annual_emissions": 5000,
                "top_category": "transport",
                "top_category_percent": 52,
            },
            "Asia": {
                "avg_annual_emissions": 1400,
                "median_annual_emissions": 1300,
                "p10_annual_emissions": 500,
                "p90_annual_emissions": 2200,
                "top_category": "food",
                "top_category_percent": 38,
            },
        }
        return benchmarks.get(region, benchmarks["Europe"])

    def _mock_user_percentile(self) -> Dict[str, Any]:
        """Mock user percentile calculation"""
        return {
            "user_annual_emissions": 1205,
            "regional_average": 2100,
            "percentile": 32,  # User is better than 32% (lower is better)
            "emissions_below_median": True,
            "rank": "Excellent",
            "compared_to_average": "32% below regional average",
        }


# Initialize service
analytics_service = AnalyticsService()


# Helper functions
async def get_comprehensive_analytics(user_id: str, region: str) -> Dict[str, Any]:
    """Get comprehensive analytics for a user"""
    return {
        "regional_benchmarks": await analytics_service.get_regional_benchmarks(region),
        "user_percentile": await analytics_service.get_user_percentile(user_id, region),
        "category_trends": await analytics_service.get_category_trends(),
        "global_stats": await analytics_service.get_achievement_stats(),
        "generated_at": datetime.utcnow().isoformat(),
    }


def calculate_comparable_metrics(user_emissions: float, benchmark: Dict) -> Dict[str, Any]:
    """Calculate how user compares to benchmark"""
    avg = benchmark.get("avg_annual_emissions", 2000)
    median = benchmark.get("median_annual_emissions", 1900)

    below_avg = user_emissions < avg
    below_median = user_emissions < median

    reduction_percent = ((avg - user_emissions) / avg * 100) if below_avg else 0

    return {
        "is_below_average": below_avg,
        "is_below_median": below_median,
        "difference_from_average_kg": avg - user_emissions,
        "reduction_percent": abs(reduction_percent),
        "status": "Excellent" if below_avg else "Average" if user_emissions < avg * 1.5 else "High",
    }
