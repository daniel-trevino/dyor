import { PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

type HeadingSize = 'H1' | 'H2' | 'H3' | 'H4' | 'H5'

export enum HeadingStyles {
  'H1' = 'text-6xl font-extrabold sm:text-8xl',
  'H2' = 'text-4xl font-extrabold sm:text-6xl',
  'H3' = 'text-3xl font-extrabold sm:text-4xl',
  'H4' = 'text-2xl font-extrabold sm:text-3xl',
  'H5' = 'text-xl font-extrabold sm:text-2xl',
}

type HeadingStylesType = keyof typeof HeadingStyles

type Props = {
  size?: HeadingSize
  className?: string
  sizeStyle?: HeadingStylesType
  gradient?: boolean
  animatedGradient?: boolean
}

const H1: React.FC<PropsWithChildren<Props>> = ({
  sizeStyle = 'H1',
  gradient,
  animatedGradient,
  className = '',
  children,
}) => (
  <h1
    className={cn(HeadingStyles[sizeStyle], className, {
      'gradient-heading': gradient,
      'animated-gradient': animatedGradient,
    })}
  >
    {children}
  </h1>
)

const H2: React.FC<PropsWithChildren<Props>> = ({
  sizeStyle = 'H2',
  gradient,
  animatedGradient,
  className = '',
  children,
}) => (
  <h2
    className={cn(HeadingStyles[sizeStyle], className, {
      'gradient-heading': gradient,
      'animated-gradient': animatedGradient,
    })}
  >
    {children}
  </h2>
)

const H3: React.FC<PropsWithChildren<Props>> = ({
  sizeStyle = 'H3',
  gradient,
  animatedGradient,
  className = '',
  children,
}) => (
  <h3
    className={cn(HeadingStyles[sizeStyle], className, {
      'gradient-heading': gradient,
      'animated-gradient': animatedGradient,
    })}
  >
    {children}
  </h3>
)

const H4: React.FC<PropsWithChildren<Props>> = ({
  sizeStyle = 'H4',
  gradient,
  animatedGradient,
  className = '',
  children,
}) => (
  <h4
    className={cn(HeadingStyles[sizeStyle], className, {
      'gradient-heading': gradient,
      'animated-gradient': animatedGradient,
    })}
  >
    {children}
  </h4>
)

const H5: React.FC<PropsWithChildren<Props>> = ({
  sizeStyle = 'H5',
  gradient,
  animatedGradient,
  className = '',
  children,
}) => (
  <h5
    className={cn(HeadingStyles[sizeStyle], className, {
      'gradient-heading': gradient,
      'animated-gradient': animatedGradient,
    })}
  >
    {children}
  </h5>
)

const Heading: React.FC<PropsWithChildren<Props>> = ({
  size = 'H1',
  sizeStyle = size,
  gradient,
  animatedGradient,
  className,
  children,
}) => {
  const headingSize = {
    H1,
    H2,
    H3,
    H4,
    H5,
  }

  const Headingcomponent = headingSize[size]

  return (
    <Headingcomponent
      className={className}
      sizeStyle={sizeStyle}
      gradient={gradient}
      animatedGradient={animatedGradient}
    >
      {children}
    </Headingcomponent>
  )
}

export default Heading
