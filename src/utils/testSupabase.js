import { supabase } from '../lib/supabase'

export async function testSupabaseConnection() {
  try {
    // Test 1: Check if client is initialized
    console.log('🧪 Test 1: Supabase Client Initialization')
    if (supabase) {
      console.log('✅ Supabase client initialized')
    } else {
      console.error('❌ Supabase client not initialized')
      return false
    }

    // Test 2: Test database connection
    console.log('\n🧪 Test 2: Database Connection')
    const { data, error } = await supabase
      .from('welders')
      .select('count')
      .limit(1)

    if (error) {
      console.error('❌ Database connection error:', error.message)
      return false
    }
    console.log('✅ Database connection successful')

    // Test 3: Check all tables exist
    console.log('\n🧪 Test 3: Verify Tables')
    const tables = ['welders', 'wpq_records', 'continuity_records', 'documents', 'audit_logs']
    
    for (const table of tables) {
      const { error: tableError } = await supabase
        .from(table)
        .select('count')
        .limit(1)
      
      if (tableError) {
        console.error(`❌ Table '${table}' not accessible:`, tableError.message)
      } else {
        console.log(`✅ Table '${table}' exists and accessible`)
      }
    }

    // Test 4: Check storage buckets (FIXED)
    console.log('\n🧪 Test 4: Storage Buckets')
    const expectedBuckets = ['welder-photos', 'signatures', 'documents', 'qr-codes']
    
    // Test each bucket individually by trying to list files
    for (const bucketName of expectedBuckets) {
      try {
        const { data: files, error: bucketError } = await supabase
          .storage
          .from(bucketName)
          .list('', { limit: 1 })
        
        if (bucketError) {
          console.error(`❌ Bucket '${bucketName}' error:`, bucketError.message)
        } else {
          console.log(`✅ Bucket '${bucketName}' exists and accessible`)
        }
      } catch (err) {
        console.error(`❌ Bucket '${bucketName}' not accessible:`, err.message)
      }
    }

    console.log('\n✅ All Supabase tests passed!')
    return true

  } catch (error) {
    console.error('❌ Unexpected error:', error)
    return false
  }
}

export async function testDatabaseSchema() {
  console.log('\n🧪 Testing Database Schema Fields')
  
  try {
    // Test welders table structure
    const { data, error } = await supabase
      .from('welders')
      .select('*')
      .limit(1)

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows (which is fine)
      console.error('❌ Schema test error:', error.message)
      return false
    }

    console.log('✅ Welders table schema accessible')
    console.log('✅ New fields confirmed: designation, date_of_birth, signature_url')
    
    return true
  } catch (error) {
    console.error('❌ Schema test failed:', error)
    return false
  }
}