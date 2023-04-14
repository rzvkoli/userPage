import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Charactercard({ name , status}) {
  return (
      <Card sx={{ maxWidth: 400 }} className='w-4/12 h-24 !shadow-none'>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom component="div" className='!font-Urbanist !font-extrabold !text-xl !uppercase'>
              {name}
            </Typography>
            <Typography gutterBottom component="div" className='!font-Urbanist !text-slate-400 !text-sm !uppercase'>
              {status}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  );
}
