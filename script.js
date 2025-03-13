const { createClient } = supabase;
const supabase = createClient('https://nejcvvkikjpqrsifgxpg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lamN2dmtpa2pwcXJzaWZneHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MTAxMDgsImV4cCI6MjA1NzM4NjEwOH0.aOsHGgeb1tccBN9Ny91SVrNPFWQnvoZw87Fm1dhinmo');

async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        console.error('Error signing up:', error.message);
        alert('Signup failed: ' + error.message);
    } else {
        console.log('User signed up:', data.user);
    }
}

async function createBlogPost(title, content, authorId) {
    const { data, error } = await supabase
        .from('blog_posts')
        .insert([{ title, content, author_id: authorId }]);
    if (error) console.error('Error creating blog post:', error.message);
    else console.log('Blog post created:', data);
}

async function getBlogPosts() {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        console.error('Error fetching blog posts:', error.message);
        return [];
    }
    return data;
}

async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error logging out:', error.message);
        alert('Logout failed: ' + error.message);
    } else {
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    }
}

// Check user session and show/hide logout button
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const logoutBtn = document.getElementById('logout-btn');
    if (user) {
        logoutBtn.style.display = 'inline';
    } else {
        logoutBtn.style.display = 'none';
    }
    logoutBtn.addEventListener('click', logout);
});
