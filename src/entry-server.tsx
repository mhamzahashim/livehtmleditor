import ReactDOMServer from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

export function render(url: string) {
  const html = ReactDOMServer.renderToString(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>
  );
  return html;
}