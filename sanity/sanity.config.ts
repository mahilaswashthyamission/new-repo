import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Mahila Swashth Mission',
  projectId: 'cm0meu1e',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
});
