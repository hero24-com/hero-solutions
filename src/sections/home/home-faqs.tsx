import type { BoxProps } from '@mui/material/Box';

import { useState } from 'react';
import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Accordion, { accordionClasses } from '@mui/material/Accordion';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatPlusIcon, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const FAQs = [
  {
    question: 'How do I book a service?',
    answer: (
      <Typography>
        You can book a service through our website at
        <Link
          href="https://www.hero24.com/tilaa-sankari"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mx: 0.5 }}
        >
          hero24.com
        </Link>
        or by calling us at +358 50 413 2867. You can also email us at support@hero24.com for any
        questions.
      </Typography>
    ),
  },
  {
    question: 'What areas do you serve?',
    answer: (
      <Box component="ul" sx={{ pl: 3, listStyleType: 'disc' }}>
        <li> We primarily serve customers throughout Finland.</li>
        <li>
          {' '}
          Major coverage areas include Uusimaa, Varsinais-Suomi, Pirkanmaa, Keski-Suomi, and
          Päijät-Häme.
        </li>
        <li> We also have services available in Costa del Sol, Spain.</li>
        <li>Contact us to confirm service availability in your specific area.</li>
      </Box>
    ),
  },
  {
    question: 'What is your satisfaction guarantee?',
    answer: (
      <Box component="ul" sx={{ pl: 3, listStyleType: 'disc' }}>
        <li> We offer a 100% satisfaction guarantee on all our services.</li>
        <li> All our professionals are insured for your peace of mind.</li>
        <li> If you're not satisfied, we'll work to make it right.</li>
      </Box>
    ),
  },
  {
    question: 'What services do you offer?',
    answer: (
      <Typography>
        {`We offer a wide range of home and property services including cleaning, HVAC services, renovations, property maintenance, moving services, asbestos surveys, and more. All services are performed by vetted and insured professionals.`}
      </Typography>
    ),
  },
  {
    question: 'How much do your services cost?',
    answer: (
      <Typography>
        Pricing varies by service type and scope. You can view transparent pricing on our website
        before booking. For example, cleaning services start from €44, HVAC services from €69, and
        asbestos surveys from €199. Contact us for a detailed quote for your specific needs.
      </Typography>
    ),
  },
  {
    question: 'Are your professionals insured?',
    answer: (
      <Typography>
        Yes, all our professionals are fully insured with liability coverage. We carefully vet all
        service providers to ensure they meet our high standards for quality and professionalism.
        Your safety and satisfaction are our top priorities.
      </Typography>
    ),
  },
];

// ----------------------------------------------------------------------

export function HomeFAQs({ sx, ...other }: BoxProps) {
  const [expanded, setExpanded] = useState<string | false>(FAQs[0].question);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderDescription = () => (
    <SectionTitle
      caption="FAQs"
      title="We’ve got the"
      txtGradient="answers"
      sx={{ textAlign: 'center' }}
    />
  );

  const renderContent = () => (
    <Box
      sx={[
        {
          mt: 8,
          gap: 1,
          mx: 'auto',
          maxWidth: 720,
          display: 'flex',
          mb: { xs: 5, md: 8 },
          flexDirection: 'column',
        },
      ]}
    >
      {FAQs.map((item, index) => (
        <Accordion
          key={item.question}
          disableGutters
          component={m.div}
          variants={varFade('inUp', { distance: 24 })}
          expanded={expanded === item.question}
          onChange={handleChange(item.question)}
          sx={(theme) => ({
            transition: theme.transitions.create(['background-color'], {
              duration: theme.transitions.duration.shorter,
            }),
            py: 1,
            px: 2.5,
            border: 'none',
            borderRadius: 2,
            '&:hover': {
              bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
            },
            [`&.${accordionClasses.expanded}`]: {
              bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
            },
          })}
        >
          <AccordionSummary
            id={`home-faqs-panel${index}-header`}
            aria-controls={`home-faqs-panel${index}-content`}
          >
            <Typography component="span" variant="h6">
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );

  const renderContact = () => (
    <Box
      sx={[
        (theme) => ({
          px: 3,
          py: 8,
          textAlign: 'center',
          background: `linear-gradient(to left, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}, transparent)`,
        }),
      ]}
    >
      <m.div variants={varFade('in')}>
        <Typography variant="h4">Still have questions?</Typography>
      </m.div>

      <m.div variants={varFade('in')}>
        <Typography sx={{ mt: 2, mb: 3, color: 'text.secondary' }}>
          Contact us and we'll be happy to help you with any questions
        </Typography>
      </m.div>

      <m.div variants={varFade('in')}>
        <Button
          color="inherit"
          variant="contained"
          href="mailto:support@hero24.com?subject=[Question] from Customer"
          startIcon={<Iconify icon="solar:letter-bold" />}
        >
          Contact us
        </Button>
      </m.div>
    </Box>
  );

  return (
    <Box component="section" sx={sx} {...other}>
      <MotionViewport sx={{ py: 10, position: 'relative' }}>
        {topLines()}

        <Container>
          {renderDescription()}
          {renderContent()}
        </Container>

        <Stack sx={{ position: 'relative' }}>
          {bottomLines()}
          {renderContact()}
        </Stack>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

const topLines = () => (
  <>
    <Stack
      spacing={8}
      alignItems="center"
      sx={{
        top: 64,
        left: 80,
        position: 'absolute',
        transform: 'translateX(-50%)',
      }}
    >
      <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
      <FloatTriangleDownIcon
        sx={{
          width: 30,
          height: 15,
          opacity: 0.24,
          position: 'static',
        }}
      />
    </Stack>

    <FloatLine vertical sx={{ top: 0, left: 80 }} />
  </>
);

const bottomLines = () => (
  <>
    <FloatLine sx={{ top: 0, left: 0 }} />
    <FloatLine sx={{ bottom: 0, left: 0 }} />
    <FloatPlusIcon sx={{ top: -8, left: 72 }} />
    <FloatPlusIcon sx={{ bottom: -8, left: 72 }} />
  </>
);
