import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import type { MotionProps, MotionValue, SpringOptions } from 'framer-motion';

import { useRef, useState } from 'react';
import { m, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar, { avatarClasses } from '@mui/material/Avatar';

import { _mock } from 'src/_mock';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

const smKey: Breakpoint = 'sm';
const mdKey: Breakpoint = 'md';
const lgKey: Breakpoint = 'lg';

const motionProps: MotionProps = {
  variants: varFade('inUp', { distance: 24 }),
};

export function HomeHero({ sx, ...other }: BoxProps) {
  const scrollProgress = useScrollPercent();

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up(mdKey));

  const distance = mdUp ? scrollProgress.percent : 0;

  const y1 = useTransformY(scrollProgress.scrollY, distance * -7);
  const y2 = useTransformY(scrollProgress.scrollY, distance * -6);
  const y3 = useTransformY(scrollProgress.scrollY, distance * -5);
  const y4 = useTransformY(scrollProgress.scrollY, distance * -4);
  const y5 = useTransformY(scrollProgress.scrollY, distance * -3);

  const opacity: MotionValue<number> = useTransform(
    scrollProgress.scrollY,
    [0, 1],
    [1, mdUp ? Number((1 - scrollProgress.percent / 100).toFixed(1)) : 1]
  );

  const renderHeading = () => (
    <m.div {...motionProps}>
      <Box
        component="h1"
        sx={[
          (theme) => ({
            my: 0,
            mx: 'auto',
            maxWidth: 680,
            display: 'flex',
            flexWrap: 'wrap',
            typography: 'h2',
            justifyContent: 'center',
            fontFamily: theme.typography.fontSecondaryFamily,
            [theme.breakpoints.up(lgKey)]: {
              fontSize: theme.typography.pxToRem(72),
              lineHeight: '90px',
            },
          }),
        ]}
      >
        <Box component="span" sx={{ width: 1, opacity: 0.24 }}>
          Professional services for
        </Box>
        your home with
        <Box
          component={m.span}
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          sx={[
            (theme) => ({
              ...theme.mixins.textGradient(
                `300deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 25%, ${theme.vars.palette.primary.main} 50%, ${theme.vars.palette.warning.main} 75%, ${theme.vars.palette.primary.main} 100%`
              ),
              backgroundSize: '400%',
              ml: { xs: 0.75, md: 1, xl: 1.5 },
            }),
          ]}
        >
          Hero Solutions
        </Box>
      </Box>
    </m.div>
  );

  const renderText = () => (
    <m.div {...motionProps}>
      <Typography
        variant="body2"
        sx={[
          (theme) => ({
            mx: 'auto',
            [theme.breakpoints.up(smKey)]: { whiteSpace: 'pre' },
            [theme.breakpoints.up(lgKey)]: { fontSize: 20, lineHeight: '36px' },
          }),
        ]}
      >
        {`Connect with trusted professionals for all your home and property needs. \nFrom cleaning to renovations - all with 100% satisfaction guarantee.`}
      </Typography>
    </m.div>
  );

  const renderRatings = () => (
    <m.div {...motionProps}>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          typography: 'subtitle2',
          justifyContent: 'center',
        }}
      >
        <AvatarGroup
          sx={{
            [`& .${avatarClasses.root}`]: {
              width: 32,
              height: 32,
            },
          }}
        >
          {Array.from({ length: 3 }, (_, index) => (
            <Avatar
              key={_mock.fullName(index + 1)}
              alt={_mock.fullName(index + 1)}
              src={_mock.image.avatar(index + 1)}
            />
          ))}
        </AvatarGroup>
        50K happy customers
      </Box>
    </m.div>
  );

  const renderButtons = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <m.div {...motionProps}>
        <Button
          color="inherit"
          size="large"
          variant="contained"
          href="tel:+358504132867"
          startIcon={<Iconify width={24} icon="solar:phone-bold" />}
          sx={{ height: 52 }}
        >
          <span>+358 50 413 2867</span>
        </Button>
      </m.div>

      <m.div {...motionProps}>
        <Button
          color="inherit"
          size="large"
          variant="outlined"
          href="mailto:support@hero24.com"
          startIcon={<Iconify width={24} icon="solar:letter-bold" />}
          sx={{ height: 52, borderColor: 'currentColor' }}
        >
          Contact Us
        </Button>
      </m.div>
    </Box>
  );

  const renderIcons = () => (
    <Stack spacing={2} sx={{ textAlign: 'center' }}>
      <m.div {...motionProps}>
        <Typography
          variant="overline"
          sx={{
            opacity: 0.5,
            letterSpacing: 1.5,
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          Available Services
        </Typography>
      </m.div>

      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {[
          { icon: 'solar:home-smile-bold-duotone', label: 'Cleaning' },
          { icon: 'solar:paint-roller-bold-duotone', label: 'Renovations' },
          { icon: 'solar:buildings-2-bold-duotone', label: 'Property' },
          { icon: 'solar:wind-bold-duotone', label: 'HVAC' },
          { icon: 'solar:box-bold-duotone', label: 'Moving' },
          { icon: 'solar:clipboard-check-bold-duotone', label: 'Inspections' },
          { icon: 'solar:widget-5-bold-duotone', label: 'Appliances' },
          { icon: 'solar:shield-check-bold-duotone', label: 'Insured' },
        ].map((service) => (
          <m.div {...motionProps} key={service.label}>
            <Stack alignItems="center" spacing={0.75}>
              <Iconify
                icon={service.icon as any}
                sx={{
                  width: 28,
                  height: 28,
                  opacity: 0.7,
                }}
              />
              <Typography
                variant="caption"
                sx={{ opacity: 0.7, fontSize: '0.7rem', fontWeight: 500 }}
              >
                {service.label}
              </Typography>
            </Stack>
          </m.div>
        ))}
      </Box>
    </Stack>
  );

  return (
    <Box
      ref={scrollProgress.elementRef}
      component="section"
      sx={[
        (theme) => ({
          overflow: 'hidden',
          position: 'relative',
          [theme.breakpoints.up(mdKey)]: {
            minHeight: 760,
            height: '100vh',
            maxHeight: 1440,
            display: 'block',
            willChange: 'opacity',
            mt: 'calc(var(--layout-header-desktop-height) * -1)',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component={m.div}
        style={{ opacity }}
        sx={[
          (theme) => ({
            width: 1,
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            transition: theme.transitions.create(['opacity']),
            [theme.breakpoints.up(mdKey)]: {
              height: 1,
              position: 'fixed',
              maxHeight: 'inherit',
            },
          }),
        ]}
      >
        <Container
          component={MotionContainer}
          sx={[
            (theme) => ({
              py: 3,
              gap: 5,
              zIndex: 9,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              [theme.breakpoints.up(mdKey)]: {
                flex: '1 1 auto',
                justifyContent: 'center',
                py: 'var(--layout-header-desktop-height)',
              },
            }),
          ]}
        >
          <Stack spacing={3} sx={{ textAlign: 'center' }}>
            <m.div style={{ y: y1 }}>{renderHeading()}</m.div>
            <m.div style={{ y: y2 }}>{renderText()}</m.div>
          </Stack>

          <m.div style={{ y: y3 }}>{renderRatings()}</m.div>
          <m.div style={{ y: y4 }}>{renderButtons()}</m.div>
          <m.div style={{ y: y5 }}>{renderIcons()}</m.div>
        </Container>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function useTransformY(value: MotionValue<number>, distance: number) {
  const physics: SpringOptions = {
    mass: 0.1,
    damping: 20,
    stiffness: 300,
    restDelta: 0.001,
  };

  return useSpring(useTransform(value, [0, 1], [0, distance]), physics);
}

function useScrollPercent() {
  const elementRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollY, 'change', (scrollHeight) => {
    let heroHeight = 0;

    if (elementRef.current) {
      heroHeight = elementRef.current.offsetHeight;
    }

    const scrollPercent = Math.floor((scrollHeight / heroHeight) * 100);

    if (scrollPercent >= 100) {
      setPercent(100);
    } else {
      setPercent(Math.floor(scrollPercent));
    }
  });

  return { elementRef, percent, scrollY };
}
