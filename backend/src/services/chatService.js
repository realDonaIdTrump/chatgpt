// chatService.js

// Save chat message to the database
export const saveMessage = async (userId, message) => {
    const query = 'INSERT INTO chat_history (user_id, message) VALUES ($1, $2)';
    const values = [userId, message];
    await pool.query(query, values);
  };
  
  // Get chat history for a user
  export const getMessages = async (userId) => {
    const query = 'SELECT * FROM chat_history WHERE user_id = $1 ORDER BY created_at ASC';
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
  };
  