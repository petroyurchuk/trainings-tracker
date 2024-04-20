import { getAllUsers } from "@/actions/getAllUsers";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";

const Community = async () => {
  const users = await getAllUsers();

  return (
    <Container
      maxWidth="lg"
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <Grid container spacing={4}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={6} key={user.id}>
            <Card raised>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default Community;
