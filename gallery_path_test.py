import requests
import sys

def test_gallery_paths():
    """Test that gallery API returns /gallery/ paths, not external URLs"""
    url = "https://beauty-hub-poland.preview.emergentagent.com/api/gallery"
    
    print("🔍 Testing Gallery API for correct /gallery/ paths...")
    print(f"   URL: {url}")
    
    try:
        response = requests.get(url, timeout=10)
        
        if response.status_code != 200:
            print(f"❌ Failed - Status: {response.status_code}")
            return False
            
        data = response.json()
        
        if not isinstance(data, list) or len(data) == 0:
            print("❌ Failed - No gallery items returned")
            return False
            
        print(f"✅ Found {len(data)} gallery items")
        
        # Check that all URLs start with /gallery/
        external_urls = []
        local_paths = []
        
        for item in data:
            if 'url' not in item:
                print(f"❌ Failed - Gallery item missing 'url' field: {item}")
                return False
                
            url_path = item['url']
            if url_path.startswith('/gallery/'):
                local_paths.append(url_path)
            else:
                external_urls.append(url_path)
        
        print(f"📊 Gallery URL Analysis:")
        print(f"   Local /gallery/ paths: {len(local_paths)}")
        print(f"   External URLs: {len(external_urls)}")
        
        if external_urls:
            print(f"❌ Found external URLs (should be /gallery/ paths):")
            for ext_url in external_urls[:5]:  # Show first 5
                print(f"     - {ext_url}")
            return False
        
        if local_paths:
            print(f"✅ All {len(local_paths)} gallery items use /gallery/ paths")
            print(f"   Sample paths:")
            for path in local_paths[:3]:  # Show first 3
                print(f"     - {path}")
            return True
        
        print("❌ No gallery items found")
        return False
        
    except Exception as e:
        print(f"❌ Failed - Error: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_gallery_paths()
    sys.exit(0 if success else 1)