import React from "react";
import { Box, Typography, Button, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";
import astronautImage from "../assets/astronaught.jpg"; // Path to your astronaut image

const NotFoundPage = () => {
    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#000",
                    color: "#fff",
                    textAlign: "center",
                    p: 2,
                }}
            >
                <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: "bold" }}>
                    404-ERROR
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
                    PAGE NOT FOUND
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Your search has ventured beyond the known universe.
                </Typography>
                <Box
                    component="img"
                    src={astronautImage}
                    alt="Astronaut reading a book"
                    sx={{ width: "300px", height: "auto", mb: 4 }}
                />
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    sx={{
                        backgroundColor: "#00f",
                        color: "#fff",
                        ":hover": {
                            backgroundColor: "#00d",
                        },
                    }}
                >
                    Back To Home
                </Button>
            </Box>
        </>
    );
};

export default NotFoundPage;
