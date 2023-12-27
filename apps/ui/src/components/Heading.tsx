import {
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const HeadingContext = createContext<HeadingType>('h1');

const nextComponentMap: Record<HeadingType, HeadingType> = {
  h1: 'h2',
  h2: 'h3',
  h3: 'h4',
  h4: 'h5',
  h5: 'h6',
  h6: 'h6',
};

type HeadingProps = PropsWithChildren<{ content: ReactNode }>;
export const Heading: FC<HeadingProps> = ({ children, content }) => {
  const Component = useContext(HeadingContext);

  return (
    <HeadingContext.Provider value={nextComponentMap[Component]}>
      <Component className="font-bold">{content}</Component>
      {children}
    </HeadingContext.Provider>
  );
};
