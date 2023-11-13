import React, { createContext, useContext, useState, ReactNode} from 'react';

export const TitleDescriptionContext = createContext<any>({ title: '', setTitle: () => {}, description: '', setDescription: () => {} });

export const useTitleDescription = () => useContext(TitleDescriptionContext);

export const TitleDescriptionProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <TitleDescriptionContext.Provider value={{ title, setTitle, description, setDescription }}>
      {children}
    </TitleDescriptionContext.Provider>
  );
};

{/*}
export const QueryContext = createContext<any>({ query: '', setQuery: () => {}});

export const useQuery = () => useContext(QueryContext);

export const QueryProvider = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState('');
  
    return (
      <QueryContext.Provider value={{ query, setQuery}}>
        {children}
      </QueryContext.Provider>
    );
  };
*/}




