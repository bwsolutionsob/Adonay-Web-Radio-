import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fnuhliytbtxpcdgexqfr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZudWhsaXl0YnR4cGNkZ2V4cWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNjc5OTcsImV4cCI6MjA3Mjc0Mzk5N30.6ac9NpwFFCM-mejd-9ScVes-7LgeT0eUrmg1-2X9Xjs';
export const supabase = createClient(supabaseUrl, supabaseKey);
