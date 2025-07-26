'use client';
import { ContentLayout } from '@/components/ContentLayout';
import { Box, Typography, Button, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import { useRouter } from 'next/navigation';

const features = [
  {
    id: 1,
    title: 'Manutenzioni',
    description: 'Gestione e pianificazione delle manutenzioni.',
    href: '/maintenance',
    imageUrl: '/maintenance.png',
  },
  {
    id: 2,
    title: 'Dashboard',
    description: 'Visualizza le statistiche e i report.',
    href: '/dashboard',
    imageUrl: '/contemplative-reptile.jpg',
  },
];

export default function Home() {
  const router = useRouter();

  const onClickHandler = (href: string) => {
    router.push(href);
  };

  return (
    <ContentLayout title="Home">
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1">
          Le principali funzionalità di questa applicazione sono accessibili tramite le card di
          seguito.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {features.map((feature) => (
          <Card key={feature.id} sx={{ width: 345 }}>
            <CardMedia sx={{ height: 140 }} image={feature.imageUrl} title="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {feature.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {feature.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => onClickHandler(feature.href)} size="small">
                Apri
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </ContentLayout>
  );
}
