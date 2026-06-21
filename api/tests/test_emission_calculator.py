"""
Test suite for emission calculator functionality
Tests calculation logic against known kg CO2e output values
"""

import sys
import os
from pathlib import Path

# Add api directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from main import calculate_emissions, EMISSION_FACTORS


class TestEmissionCalculator:
    """Test suite for emission calculations"""

    def test_transport_car_calculation(self):
        """Test transport/car emissions calculation"""
        # Test case: 100 km drive with average car
        # Expected: 100 km * 0.120 kg CO2e/km = 12.0 kg CO2e
        result = calculate_emissions("transport", "car", 100)
        assert result == 12.0, f"Expected 12.0, got {result}"

    def test_transport_electric_car_calculation(self):
        """Test transport/electric car emissions calculation"""
        # Test case: 100 km drive with electric car
        # Expected: 100 km * 0.025 kg CO2e/km = 2.5 kg CO2e
        result = calculate_emissions("transport", "electric_car", 100)
        assert result == 2.5, f"Expected 2.5, got {result}"

    def test_energy_electricity_calculation(self):
        """Test energy/electricity emissions calculation"""
        # Test case: 50 kWh electricity usage
        # Expected: 50 kWh * 0.415 kg CO2e/kWh = 20.75 kg CO2e
        result = calculate_emissions("energy", "electricity", 50)
        assert result == 20.75, f"Expected 20.75, got {result}"

    def test_energy_natural_gas_calculation(self):
        """Test energy/natural gas emissions calculation"""
        # Test case: 10 m3 of natural gas
        # Expected: 10 m3 * 2.04 kg CO2e/m3 = 20.4 kg CO2e
        result = calculate_emissions("energy", "natural_gas", 10)
        assert result == 20.4, f"Expected 20.4, got {result}"

    def test_food_beef_calculation(self):
        """Test food/beef emissions calculation"""
        # Test case: 2 kg of beef
        # Expected: 2 kg * 27.0 kg CO2e/kg = 54.0 kg CO2e
        result = calculate_emissions("food", "meat_beef", 2)
        assert result == 54.0, f"Expected 54.0, got {result}"

    def test_food_vegetables_calculation(self):
        """Test food/vegetables emissions calculation"""
        # Test case: 5 kg of vegetables
        # Expected: 5 kg * 0.22 kg CO2e/kg = 1.1 kg CO2e
        result = calculate_emissions("food", "vegetables", 5)
        assert result == 1.1, f"Expected 1.1, got {result}"

    def test_consumption_clothing_calculation(self):
        """Test consumption/clothing emissions calculation"""
        # Test case: 3 clothing items
        # Expected: 3 items * 7.0 kg CO2e/item = 21.0 kg CO2e
        result = calculate_emissions("consumption", "clothing", 3)
        assert result == 21.0, f"Expected 21.0, got {result}"

    def test_consumption_electronics_calculation(self):
        """Test consumption/electronics emissions calculation"""
        # Test case: 1 electronics item
        # Expected: 1 item * 85.0 kg CO2e/item = 85.0 kg CO2e
        result = calculate_emissions("consumption", "electronics", 1)
        assert result == 85.0, f"Expected 85.0, got {result}"

    def test_invalid_category(self):
        """Test invalid category raises ValueError"""
        try:
            calculate_emissions("invalid_category", "subcategory", 100)
            assert False, "Should have raised ValueError for invalid category"
        except ValueError as e:
            assert "Invalid category" in str(e)

    def test_invalid_subcategory(self):
        """Test invalid subcategory raises ValueError"""
        try:
            calculate_emissions("transport", "invalid_subcategory", 100)
            assert False, "Should have raised ValueError for invalid subcategory"
        except ValueError as e:
            assert "Invalid subcategory" in str(e)

    def test_zero_value(self):
        """Test zero value returns zero emissions"""
        result = calculate_emissions("transport", "car", 0)
        assert result == 0.0, f"Expected 0.0, got {result}"

    def test_large_value(self):
        """Test calculation with large values"""
        # Test case: 1000 km flight
        # Expected: 1000 km * 0.255 kg CO2e/km = 255.0 kg CO2e
        result = calculate_emissions("transport", "flight_domestic", 1000)
        assert result == 255.0, f"Expected 255.0, got {result}"

    def test_emission_factors_exist(self):
        """Test that emission factors are properly loaded"""
        assert "transport" in EMISSION_FACTORS, "transport category missing"
        assert "energy" in EMISSION_FACTORS, "energy category missing"
        assert "food" in EMISSION_FACTORS, "food category missing"
        assert "consumption" in EMISSION_FACTORS, "consumption category missing"

    def test_emission_factors_have_values(self):
        """Test that all emission factors have positive values"""
        for category, subcategories in EMISSION_FACTORS.items():
            for subcategory, factor in subcategories.items():
                assert isinstance(factor, (int, float)), f"Invalid factor type for {category}/{subcategory}"
                # All factors should be >= 0 (bike is 0)
                assert factor >= 0, f"Negative factor for {category}/{subcategory}"


if __name__ == "__main__":
    # Allow direct execution for testing
    test_suite = TestEmissionCalculator()
    for method_name in dir(test_suite):
        if method_name.startswith("test_"):
            print(f"Running {method_name}...", end=" ")
            try:
                getattr(test_suite, method_name)()
                print("✓")
            except AssertionError as e:
                print(f"✗ {e}")
