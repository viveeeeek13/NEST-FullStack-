import fetch from 'node-fetch';

const API_URL = 'http://localhost:10000/api';

async function testAuth() {
    console.log('🔧 Testing Authentication Flow...\n');

    // Test 1: Signup
    console.log('1️⃣  Creating host account...');
    try {
        const signupRes = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Demo Host',
                email: 'demohost@test.com',
                password: 'Demo1234',
                role: 'host'
            })
        });

        const signupData = await signupRes.json();
        console.log('   ✅ Signup response:', signupData);
    } catch (err) {
        console.log('   ⚠️  Signup error (might already exist):', err.message);
    }

    // Test 2: Login
    console.log('\n2️⃣  Logging in...');
    try {
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'demohost@test.com',
                password: 'Demo1234'
            })
        });

        const loginData = await loginRes.json();

        if (loginData.token) {
            console.log('   ✅ Login successful!');
            console.log('   🔑 Token:', loginData.token.substring(0, 20) + '...');

            // Test 3: Get user info
            console.log('\n3️⃣  Fetching user info...');
            const meRes = await fetch(`${API_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${loginData.token}` }
            });

            const meData = await meRes.json();
            console.log('   ✅ User data:', meData);

            console.log('\n✨ Authentication is working correctly!');
            console.log('\n📝 Use these credentials to login:');
            console.log('   Email: demohost@test.com');
            console.log('   Password: Demo1234');
            console.log('\n🌐 Access the dashboard at: http://localhost:5174/host-dashboard');
        } else {
            console.log('   ❌ Login failed:', loginData);
        }
    } catch (err) {
        console.log('   ❌ Login error:', err.message);
    }
}

testAuth();
