import React, { useEffect, useState } from "react";

import Drawer from "./Drawer";

const Dashboard = () => {
  return (
    <Drawer />
    // <Container>
    //   <Typography variant="h4" gutterBottom>
    //     Dashboard
    //   </Typography>
    //   {loading ? (
    //     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    //       <CircularProgress />
    //     </Box>
    //   ) : (
    //     <Paper elevation={3} sx={{ padding: 2 }}>
    //       {error ? (
    //         <Typography color="error" variant="h6">
    //           {error}
    //         </Typography>
    //       ) : (
    //         <>
    //           <Typography variant="h6">
    //             Welcome, {userData ? userData.email : "Loading..."}
    //           </Typography>
    //           <Button variant="contained" color="primary" onClick={handleLogout}>
    //             Logout
    //           </Button>
    //         </>
    //       )}
    //     </Paper>
    //   )}
    // </Container>
  );
};

export default Dashboard;
