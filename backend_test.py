import requests
import sys
from datetime import datetime

class BeautySalonAPITester:
    def __init__(self, base_url="https://beauty-hub-poland.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, expected_data_check=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                try:
                    data = response.json()
                    if expected_data_check:
                        data_valid = expected_data_check(data)
                        if not data_valid:
                            success = False
                            print(f"❌ Failed - Data validation failed")
                        else:
                            print(f"✅ Passed - Status: {response.status_code}, Data: Valid")
                    else:
                        print(f"✅ Passed - Status: {response.status_code}")
                except Exception as e:
                    print(f"❌ Failed - JSON parsing error: {str(e)}")
                    success = False
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Response: {response.text[:200]}")

            if success:
                self.tests_passed += 1
            else:
                self.failed_tests.append(f"{name} - {endpoint}")

            return success, response.json() if success else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append(f"{name} - {endpoint} - {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API",
            "GET",
            "",
            200,
            lambda data: "message" in data and "Place of Beauty" in data["message"]
        )

    def test_services_endpoint(self):
        """Test services endpoint"""
        return self.run_test(
            "Get Services",
            "GET",
            "services",
            200,
            lambda data: isinstance(data, list) and len(data) > 0 and "category" in data[0]
        )

    def test_categories_endpoint(self):
        """Test categories endpoint"""
        return self.run_test(
            "Get Categories",
            "GET",
            "categories",
            200,
            lambda data: isinstance(data, list) and len(data) > 0
        )

    def test_reviews_endpoint(self):
        """Test reviews endpoint"""
        return self.run_test(
            "Get Reviews",
            "GET",
            "reviews",
            200,
            lambda data: isinstance(data, list) and len(data) > 0 and "name" in data[0]
        )

    def test_gallery_endpoint(self):
        """Test gallery endpoint"""
        return self.run_test(
            "Get Gallery",
            "GET",
            "gallery",
            200,
            lambda data: isinstance(data, list) and len(data) > 0 and "url" in data[0]
        )

    def test_salon_info_endpoint(self):
        """Test salon info endpoint"""
        return self.run_test(
            "Get Salon Info",
            "GET",
            "salon-info",
            200,
            lambda data: "name" in data and data["name"] == "Place of Beauty"
        )

    def test_services_by_category(self):
        """Test services by category endpoint"""
        return self.run_test(
            "Get Services by Category (Manicure)",
            "GET",
            "services/Manicure",
            200,
            lambda data: isinstance(data, list) and len(data) > 0
        )

def main():
    print("🧪 Starting Place of Beauty API Tests")
    print("=" * 50)
    
    # Setup
    tester = BeautySalonAPITester()

    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_services_endpoint,
        tester.test_categories_endpoint,
        tester.test_reviews_endpoint,
        tester.test_gallery_endpoint,
        tester.test_salon_info_endpoint,
        tester.test_services_by_category,
    ]

    for test in tests:
        test()

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failed in tester.failed_tests:
            print(f"   - {failed}")
    else:
        print("\n✅ All tests passed!")

    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())