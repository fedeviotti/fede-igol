import { ContentLayout } from '@/components/ContentLayout';
import { Box, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';

export default function Home() {
  return (
    <ContentLayout title="Home">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Benvenuto nella tua dashboard
        </Typography>
        <Typography variant="body1">
          Questa è una home page di esempio con componenti di Material UI. Puoi personalizzarla
          secondo le tue esigenze.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {[1, 2, 3].map((i) => (
          <Grid key={i}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Card {i}
                </Typography>
                <Typography variant="body2">
                  Questa è una breve descrizione del contenuto della card numero {i}.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Dettagli</Button>
                <Button size="small" variant="outlined">
                  Azione
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ContentLayout>
  );
}
