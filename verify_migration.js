const supabase = require('./utils/supabaseClient');

async function verifyMigration() {
  try {
    console.log('🔍 Verifying database migration...');
    
    // Try to get banners with display_order
    const { data, error } = await supabase
      .from('home_banner')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error accessing home_banner table:', error.message);
      return;
    }
    
    if (data && data.length > 0) {
      const banner = data[0];
      console.log('✅ Successfully accessed home_banner table');
      console.log('📋 Available columns:', Object.keys(banner));
      
      if ('display_order' in banner) {
        console.log('✅ display_order column exists!');
        console.log('📊 Sample data:', {
          id: banner.id,
          title: banner.title,
          display_order: banner.display_order
        });
      } else {
        console.log('❌ display_order column is missing');
        console.log('💡 Please run the migration in your Supabase dashboard');
      }
    } else {
      console.log('⚠️  No banners found in the table');
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

verifyMigration(); 