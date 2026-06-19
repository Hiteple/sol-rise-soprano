import { defineStackbitConfig, type Field } from '@stackbit/types'
import { GitContentSource } from '@stackbit/cms-git'

function colorSchemeEnumField(name: string, group?: string) {
  return {
    name,
    type: 'enum' as const,
    label: 'Color Scheme',
    /** Non-required enums show a “None” option in the visual editor; clearing breaks our Zod pipeline. */
    required: true,
    options: [
      { label: 'Soft', value: 'soft' },
      { label: 'Bright', value: 'bright' },
      { label: 'Wine', value: 'wine' },
    ],
    default: 'soft',
    ...(group ? { group } : {}),
  }
}

function slideInField(name: string, group?: string) {
  return {
    name,
    type: 'boolean' as const,
    label: 'Slide In Animation',
    default: true,
    ...(group ? { group } : {}),
  }
}

function heroColorSchemeField() {
  return {
    name: 'heroColorScheme',
    type: 'enum' as const,
    label: 'Color Scheme',
    required: true,
    options: [
      { label: 'Clear', value: 'clear' },
      { label: 'Wine', value: 'wine' },
    ],
    default: 'wine',
    group: 'hero',
  }
}

/** Shared with `src/lib/content-order.ts`: `order: 0` hides the item until you set 1, 2, 3… */
function contentOrderField() {
  return {
    name: 'order',
    type: 'number' as const,
    label: 'Display order',
    description:
      'Set to 0 to keep this item hidden (draft). Use 1, 2, 3… to publish and control sort order on the site.',
  }
}

function fieldWithDescription<const T extends Record<string, unknown>>(
  field: T,
  description: string,
): Field {
  return { ...field, description } as unknown as Field
}

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '22',
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/',
      },
      models: [
        {
          name: 'HomePage',
          type: 'page',
          urlPath: '/',
          filePath: 'content/home/data.md',
          fieldGroups: [
            { name: 'hero', label: 'Hero' },
            { name: 'imageTextAbout', label: 'Image + Text' },
            { name: 'organizationsStrip', label: 'Organizations Strip' },
            { name: 'featuredVideo', label: 'Featured Video' },
            { name: 'mediaGrid', label: 'Media Grid' },
            { name: 'featuredEvents', label: 'Featured Events' },
            { name: 'quoteBanner', label: 'Quote Banner' },
          ],
          fields: [
            { name: 'headerBrandLine1', type: 'string', label: 'Header - Brand line 1' },
            { name: 'headerBrandLine2', type: 'string', label: 'Header - Brand line 2' },
            {
              name: 'headerBrandLogo',
              type: 'image',
              label: 'Header - Logo (optional)',
              description:
                'Replaces the two-line text brand when set. Prefer a light/white logo for the transparent home hero.',
            },
            {
              name: 'headerNavLinks',
              type: 'list',
              label: 'Header - Navigation Links',
              items: {
                type: 'object',
                fields: [
                  { name: 'label', type: 'string', label: 'Label' },
                  { name: 'href', type: 'string', label: 'URL' },
                ],
              },
            },
            heroColorSchemeField(),
            { name: 'heroTitle', type: 'string', label: 'Title', group: 'hero' },
            { name: 'heroSubtitle', type: 'string', label: 'Subtitle', group: 'hero' },
            { name: 'heroTagline', type: 'string', label: 'Eyebrow', group: 'hero' },
            { name: 'heroImage', type: 'image', label: 'Background image', group: 'hero' },
            { name: 'heroImageAlt', type: 'string', label: 'Image alt', group: 'hero' },
            { name: 'primaryCtaLabel', type: 'string', label: 'Primary CTA label', group: 'hero' },
            { name: 'primaryCtaHref', type: 'string', label: 'Primary CTA URL', group: 'hero' },
            { name: 'secondaryCtaLabel', type: 'string', label: 'Secondary CTA label', group: 'hero' },
            { name: 'secondaryCtaHref', type: 'string', label: 'Secondary CTA URL', group: 'hero' },
            colorSchemeEnumField('aboutSurface', 'imageTextAbout'),
            slideInField('aboutSlideIn', 'imageTextAbout'),
            { name: 'aboutEyebrow', type: 'string', label: 'Eyebrow', group: 'imageTextAbout' },
            { name: 'aboutTitle', type: 'string', label: 'Title', group: 'imageTextAbout' },
            { name: 'aboutText', type: 'text', label: 'Body', group: 'imageTextAbout' },
            { name: 'aboutImage', type: 'image', label: 'Image', group: 'imageTextAbout' },
            { name: 'aboutImageAlt', type: 'string', label: 'Image alt', group: 'imageTextAbout' },
            { name: 'aboutLinkText', type: 'string', label: 'Link text', group: 'imageTextAbout' },
            { name: 'aboutHref', type: 'string', label: 'Link URL', group: 'imageTextAbout' },
            colorSchemeEnumField('organizationsStripColorScheme', 'organizationsStrip'),
            slideInField('organizationsStripSlideIn', 'organizationsStrip'),
            {
              name: 'organizationsStripEyebrow',
              type: 'string',
              label: 'Eyebrow',
              group: 'organizationsStrip',
            },
            {
              name: 'organizationsStripTitle',
              type: 'string',
              label: 'Title',
              group: 'organizationsStrip',
            },
            {
              name: 'organizationsStripDescription',
              type: 'text',
              label: 'Description',
              group: 'organizationsStrip',
            },
            {
              name: 'organizationsStripLinkText',
              type: 'string',
              label: 'Link text',
              group: 'organizationsStrip',
            },
            {
              name: 'organizationsStripItems',
              type: 'list',
              label: 'Featured organizations (slugs)',
              group: 'organizationsStrip',
              items: { type: 'string' },
            },
            fieldWithDescription(
              {
                name: 'featuredVideoScheduleSlug',
                type: 'string',
                label: 'Schedule event slug',
                group: 'featuredVideo',
              },
              'Filename without .md from content/schedule/ (must have videoUrl). Leave empty to use the newest past event with a video.',
            ),
            colorSchemeEnumField('featuredVideoColorScheme', 'featuredVideo'),
            slideInField('featuredVideoSlideIn', 'featuredVideo'),
            { name: 'featuredVideoEyebrow', type: 'string', label: 'Eyebrow', group: 'featuredVideo' },
            { name: 'featuredVideoTitle', type: 'string', label: 'Title', group: 'featuredVideo' },
            {
              name: 'featuredVideoDescription',
              type: 'text',
              label: 'Description',
              group: 'featuredVideo',
            },
            {
              name: 'featuredVideoLinkText',
              type: 'string',
              label: 'Link text',
              group: 'featuredVideo',
            },
            colorSchemeEnumField('mediaGridColorScheme', 'mediaGrid'),
            slideInField('mediaGridSlideIn', 'mediaGrid'),
            { name: 'mediaEyebrow', type: 'string', label: 'Eyebrow', group: 'mediaGrid' },
            { name: 'mediaTitle', type: 'string', label: 'Title', group: 'mediaGrid' },
            fieldWithDescription(
              {
                name: 'lastEventsItems',
                type: 'list',
                label: 'Last Events (schedule slugs)',
                group: 'mediaGrid',
                items: { type: 'string' },
              },
              'Order of past schedule events on the home grid. Slug = filename without .md from content/schedule/. Leave empty to show all published past events by order.',
            ),
            fieldWithDescription(
              {
                name: 'featuredEventsLayout',
                type: 'enum',
                label: 'Layout',
                group: 'featuredEvents',
                options: [
                  { label: 'Split grid (large panels)', value: 'splitGrid' },
                  { label: 'Schedule cards', value: 'scheduleCards' },
                ],
              },
              'splitGrid = 3 large panels (best for 3 items). scheduleCards = cards like /schedule (better for 1–2 items).',
            ),
            colorSchemeEnumField('splitGridColorScheme', 'featuredEvents'),
            slideInField('splitGridSlideIn', 'featuredEvents'),
            { name: 'splitGridTitle', type: 'string', label: 'Title', group: 'featuredEvents' },
            { name: 'splitGridDescription', type: 'text', label: 'Description', group: 'featuredEvents' },
            {
              name: 'splitGridItems',
              type: 'list',
              label: 'Items',
              group: 'featuredEvents',
              items: {
                type: 'object',
                fields: [
                  { name: 'href', type: 'string', label: 'URL' },
                  { name: 'image', type: 'image', label: 'Background image' },
                  {
                    name: 'badges',
                    type: 'list',
                    label: 'Labels (max 4)',
                    items: { type: 'string' },
                  },
                  { name: 'title', type: 'string', label: 'Title' },
                  { name: 'subtitle', type: 'string', label: 'Subtitle' },
                ],
              },
            },
            colorSchemeEnumField('quoteBannerColorScheme', 'quoteBanner'),
            slideInField('quoteBannerSlideIn', 'quoteBanner'),
            { name: 'quoteText', type: 'text', label: 'Quote', group: 'quoteBanner' },
            { name: 'quoteAuthor', type: 'string', label: 'Author', group: 'quoteBanner' },
            { name: 'quoteImage', type: 'image', label: 'Background image', group: 'quoteBanner' },
            { name: 'quoteImageAlt', type: 'string', label: 'Image alt', group: 'quoteBanner' },
            {
              name: 'quoteImageCredit',
              type: 'object',
              label: 'Image credit (optional)',
              group: 'quoteBanner',
              fields: [
                { name: 'author', type: 'string', label: 'Photographer name' },
                { name: 'authorUrl', type: 'string', label: 'Photographer URL' },
                { name: 'source', type: 'string', label: 'Source label (default: Unsplash)' },
                { name: 'sourceUrl', type: 'string', label: 'Photo URL on source' },
              ],
            },
            { name: 'footerBrandLine1', type: 'string', label: 'Footer - Brand line 1' },
            { name: 'footerBrandLine2', type: 'string', label: 'Footer - Brand line 2' },
            {
              name: 'footerBrandLogo',
              type: 'image',
              label: 'Footer - Logo (optional)',
              description: 'Replaces the two-line text brand when set.',
            },
            {
              name: 'footerNavLinks',
              type: 'list',
              label: 'Footer - Navigation Links',
              items: {
                type: 'object',
                fields: [
                  { name: 'label', type: 'string', label: 'Label' },
                  { name: 'href', type: 'string', label: 'URL' },
                ],
              },
            },
            { name: 'instagramUrl', type: 'string', label: 'Footer - Social - Instagram URL' },
            { name: 'youtubeUrl', type: 'string', label: 'Footer - Social - YouTube URL' },
            { name: 'facebookUrl', type: 'string', label: 'Footer - Social - Facebook URL' },
            { name: 'muvacUrl', type: 'string', label: 'Footer - Social - Muvac URL' },
            { name: 'email', type: 'string', label: 'Footer - Contact Email' },
          ],
        },
        {
          name: 'BioPage',
          type: 'page',
          urlPath: '/bio',
          filePath: 'content/bio/page.md',
          fieldGroups: [
            { name: 'pageHero', label: 'Page Hero' },
            { name: 'richtextContent', label: 'Richtext Content' },
          ],
          fields: [
            colorSchemeEnumField('pageHeroColorScheme', 'pageHero'),
            { name: 'heroEyebrow', type: 'string', label: 'Eyebrow', group: 'pageHero' },
            { name: 'heroTitle', type: 'string', label: 'Title', group: 'pageHero' },
            { name: 'heroDescription', type: 'text', label: 'Description', group: 'pageHero' },
            colorSchemeEnumField('fullBioColorScheme', 'richtextContent'),
            slideInField('fullBioSlideIn', 'richtextContent'),
            { name: 'fullBioEyebrow', type: 'string', label: 'Eyebrow', group: 'richtextContent' },
            {
              name: 'fullBioParagraphs',
              type: 'list',
              label: 'Paragraphs',
              group: 'richtextContent',
              items: {
                type: 'object',
                fields: [
                  { name: 'content', type: 'markdown', label: 'Paragraph markdown' },
                  { name: 'addBorderBottom', type: 'boolean', label: 'Add Border Bottom' },
                ],
              },
            },
            { name: 'fullBioImage', type: 'image', label: 'Side image (optional; leave empty for centered text)', group: 'richtextContent' },
            { name: 'fullBioImageAlt', type: 'string', label: 'Side image alt', group: 'richtextContent' },
            {
              name: 'fullBioImagePhotography',
              type: 'string',
              label: 'Side image photography credit',
              group: 'richtextContent',
            },
            {
              name: 'fullBioImagePosition',
              type: 'enum',
              label: 'Side image position',
              options: [
                { label: 'Right', value: 'right' },
                { label: 'Left', value: 'left' },
              ],
              default: 'right',
              group: 'richtextContent',
            },
          ],
        },
        {
          name: 'CareerPage',
          type: 'page',
          urlPath: '/career',
          filePath: 'content/career/page.md',
          fieldGroups: [
            { name: 'imageBigText', label: 'Image + Big Text' },
            { name: 'statsRow', label: 'Stats Row' },
            { name: 'timeline', label: 'Timeline' },
          ],
          fields: [
            colorSchemeEnumField('heroColorScheme', 'imageBigText'),
            slideInField('heroSlideIn', 'imageBigText'),
            { name: 'heroEyebrow', type: 'string', label: 'Eyebrow', group: 'imageBigText' },
            { name: 'heroTitleLine1', type: 'string', label: 'Title line 1', group: 'imageBigText' },
            { name: 'heroTitleAccent', type: 'string', label: 'Accent word', group: 'imageBigText' },
            { name: 'heroTitleLine2', type: 'string', label: 'Title line 2', group: 'imageBigText' },
            { name: 'heroIntro', type: 'text', label: 'Intro', group: 'imageBigText' },
            { name: 'heroImage', type: 'image', label: 'Portrait (optional; uses home About image if empty)', group: 'imageBigText' },
            { name: 'heroImageAlt', type: 'string', label: 'Image alt', group: 'imageBigText' },
            { name: 'heroQuote', type: 'text', label: 'Quote', group: 'imageBigText' },
            { name: 'heroQuoteAttribution', type: 'string', label: 'Quote attribution', group: 'imageBigText' },
            colorSchemeEnumField('statsSurface', 'statsRow'),
            slideInField('statsSlideIn', 'statsRow'),
            { name: 'highlights', type: 'list', label: 'Highlights', items: { type: 'object', fields: [{ name: 'number', type: 'string', label: 'Number' }, { name: 'label', type: 'string', label: 'Label' }] }, group: 'statsRow' },
            colorSchemeEnumField('timelineColorScheme', 'timeline'),
            slideInField('timelineSlideIn', 'timeline'),
            { name: 'timelineSectionEyebrow', type: 'string', label: 'Eyebrow', group: 'timeline' },
            { name: 'timelineSectionTitle', type: 'string', label: 'Heading', group: 'timeline' },
            { name: 'timeline', type: 'list', label: 'Milestones', items: { type: 'object', fields: [{ name: 'year', type: 'string', label: 'Year' }, { name: 'title', type: 'string', label: 'Title' }, { name: 'description', type: 'markdown', label: 'Body (Markdown)' }] }, group: 'timeline' },
            { name: 'timelineClosureMessage', type: 'string', label: 'Timeline closing line', description: 'Italic line below the milestone track (e.g. “The journey continues…”).', group: 'timeline' },
            { name: 'ctaPrimaryLabel', type: 'string', label: 'Contact link label', group: 'timeline' },
            { name: 'ctaPrimaryHref', type: 'string', label: 'Contact link URL', group: 'timeline' },
          ],
        },
        {
          name: 'RolesPage',
          type: 'page',
          urlPath: '/roles',
          filePath: 'content/roles-landing/page.md',
          fieldGroups: [
            { name: 'pageHero', label: 'Page Hero' },
            { name: 'rolesIndex', label: 'Roles List' },
          ],
          fields: [
            colorSchemeEnumField('pageHeroColorScheme', 'pageHero'),
            { name: 'heroEyebrow', type: 'string', label: 'Eyebrow', group: 'pageHero' },
            { name: 'heroTitle', type: 'string', label: 'Title', group: 'pageHero' },
            { name: 'heroDescription', type: 'text', label: 'Description', group: 'pageHero' },
            colorSchemeEnumField('rolesListColorScheme', 'rolesIndex'),
            slideInField('rolesListSlideIn', 'rolesIndex'),
          ],
        },
        {
          name: 'OrganizationsPage',
          type: 'page',
          urlPath: '/organizations',
          filePath: 'content/organizations-landing/page.md',
          fieldGroups: [
            { name: 'pageHero', label: 'Page Hero' },
            { name: 'organizationsIndex', label: 'Organizations List' },
          ],
          fields: [
            colorSchemeEnumField('pageHeroColorScheme', 'pageHero'),
            { name: 'heroEyebrow', type: 'string', label: 'Eyebrow', group: 'pageHero' },
            { name: 'heroTitle', type: 'string', label: 'Title', group: 'pageHero' },
            { name: 'heroDescription', type: 'text', label: 'Description', group: 'pageHero' },
            colorSchemeEnumField('organizationsListColorScheme', 'organizationsIndex'),
            slideInField('organizationsListSlideIn', 'organizationsIndex'),
          ],
        },
        {
          name: 'SchedulePage',
          type: 'page',
          urlPath: '/schedule',
          filePath: 'content/schedule-landing/page.md',
          fieldGroups: [
            { name: 'pageHero', label: 'Page Hero' },
            { name: 'upcoming', label: 'Upcoming' },
            { name: 'past', label: 'Past' },
          ],
          fields: [
            colorSchemeEnumField('pageHeroColorScheme', 'pageHero'),
            { name: 'heroEyebrow', type: 'string', label: 'Eyebrow', group: 'pageHero' },
            { name: 'heroTitle', type: 'string', label: 'Title', group: 'pageHero' },
            { name: 'heroDescription', type: 'text', label: 'Description', group: 'pageHero' },
            colorSchemeEnumField('upcomingColorScheme', 'upcoming'),
            slideInField('upcomingSlideIn', 'upcoming'),
            colorSchemeEnumField('pastColorScheme', 'past'),
            slideInField('pastSlideIn', 'past'),
          ],
        },
        {
          name: 'GalleryPage',
          type: 'page',
          urlPath: '/gallery',
          filePath: 'content/gallery-landing/page.md',
          fieldGroups: [
            { name: 'pageHero', label: 'Page Hero' },
            { name: 'tabItems', label: 'Tab Items' },
          ],
          fields: [
            colorSchemeEnumField('pageHeroColorScheme', 'pageHero'),
            { name: 'heroEyebrow', type: 'string', label: 'Eyebrow', group: 'pageHero' },
            { name: 'heroTitle', type: 'string', label: 'Title', group: 'pageHero' },
            colorSchemeEnumField('tabItemsColorScheme', 'tabItems'),
            slideInField('tabItemsSlideIn', 'tabItems'),
            { name: 'filterCategories', type: 'list', label: 'Categories (first should be “All”)', items: { type: 'string' }, group: 'tabItems' },
          ],
        },
        {
          name: 'ContactPage',
          type: 'page',
          urlPath: '/contact',
          filePath: 'content/contact/page.md',
          fieldGroups: [
            { name: 'pageHero', label: 'Page Hero' },
            { name: 'contactForm', label: 'Contact Form' },
          ],
          fields: [
            colorSchemeEnumField('pageHeroColorScheme', 'pageHero'),
            { name: 'heroEyebrow', type: 'string', label: 'Eyebrow', group: 'pageHero' },
            { name: 'heroTitle', type: 'string', label: 'Title', group: 'pageHero' },
            colorSchemeEnumField('contactFormColorScheme', 'contactForm'),
            slideInField('contactFormSlideIn', 'contactForm'),
            { name: 'introHeading', type: 'string', label: 'Heading', group: 'contactForm' },
            { name: 'introBody', type: 'text', label: 'Body', group: 'contactForm' },
            { name: 'directEmailLabel', type: 'string', label: 'Email label', group: 'contactForm' },
            { name: 'email', type: 'string', label: 'Address', group: 'contactForm' },
            { name: 'socialChannelsLabel', type: 'string', label: 'Social heading', group: 'contactForm' },
            { name: 'instagramUrl', type: 'string', label: 'Instagram URL', group: 'contactForm' },
            { name: 'instagramHandle', type: 'string', label: 'Instagram display', group: 'contactForm' },
            { name: 'youtubeUrl', type: 'string', label: 'YouTube URL', group: 'contactForm' },
            { name: 'youtubeHandle', type: 'string', label: 'YouTube display', group: 'contactForm' },
            { name: 'facebookUrl', type: 'string', label: 'Facebook URL', group: 'contactForm' },
            { name: 'facebookHandle', type: 'string', label: 'Facebook display', group: 'contactForm' },
            { name: 'muvacUrl', type: 'string', label: 'Muvac URL', group: 'contactForm' },
            { name: 'muvacHandle', type: 'string', label: 'Muvac display', group: 'contactForm' },
            { name: 'formSubjectOptions', type: 'list', label: 'Form subject options', items: { type: 'string' }, group: 'contactForm' },
            { name: 'successTitle', type: 'string', label: 'Form success title', group: 'contactForm' },
            { name: 'successMessage', type: 'text', label: 'Form success message', group: 'contactForm' },
            { name: 'successResetLabel', type: 'string', label: 'Form reset link text', group: 'contactForm' },
          ],
        },
        {
          name: 'GalleryItem',
          type: 'data',
          folder: 'content/gallery',
          fields: [
            { name: 'title', type: 'string', label: 'Title' },
            { name: 'image', type: 'string', label: 'Image URL' },
            { name: 'alt', type: 'string', label: 'Alt Text (accessibility)' },
            fieldWithDescription(
              { name: 'category', type: 'string', label: 'Category' },
              'Filter tabs on /gallery only (e.g. Performance, Behind the Scenes). Must match gallery landing categories.',
            ),
            {
              name: 'photographer',
              type: 'string',
              label: 'Photographer credit (optional — leave empty for own photos)',
              description: 'Name only — the site displays PH: {name} on hover and in the lightbox.',
            },
            contentOrderField(),
            fieldWithDescription(
              {
                name: 'featuredImg',
                type: 'boolean',
                label: 'Featured image (spans 2 columns on desktop)',
                default: false,
              },
              'Large tile on the gallery grid (desktop).',
            ),
            fieldWithDescription(
              { name: 'roleSlug', type: 'string', label: 'Role slug' },
              'Filename without .md from content/roles/ — shows this photo on the role detail page. Omit for gallery-only images.',
            ),
            fieldWithDescription(
              { name: 'gallerySlug', type: 'string', label: 'Gallery slug' },
              'Match gallerySlug on a past schedule event (concerts without an operatic role). Same string on both files.',
            ),
          ],
        },
        {
          name: 'Role',
          type: 'data',
          folder: 'content/roles',
          fields: [
            { name: 'characterName', type: 'string', label: 'Character' },
            { name: 'operaTitle', type: 'string', label: 'Opera' },
            { name: 'composer', type: 'string', label: 'Composer' },
            fieldWithDescription(
              {
                name: 'category',
                type: 'enum',
                label: 'Category',
                options: [
                  { label: 'Lead', value: 'lead' },
                  { label: 'Supporting', value: 'supporting' },
                  { label: 'Ensemble', value: 'ensemble' },
                ],
              },
              'Lead, supporting, or ensemble — shown as a badge on the performances index.',
            ),
            fieldWithDescription(
              { name: 'heroImage', type: 'image', label: 'Card image' },
              'Portrait for the roles index card (4:5). Use images/general/placeholder-portrait.svg while preparing.',
            ),
            fieldWithDescription(
              { name: 'featureImage', type: 'image', label: 'Feature image' },
              'Landscape image on the role detail page (16:10). Use images/general/placeholder-landscape.svg while preparing.',
            ),
            fieldWithDescription(
              { name: 'featureImagePhotography', type: 'string', label: 'Feature image photography credit' },
              'Photo credit on the feature image (e.g. "Jane Doe" or "PH: Jane Doe"). Shown at the bottom of the image on the role detail page.',
            ),
            { name: 'summary', type: 'text', label: 'Summary' },
            contentOrderField(),
            { name: 'tags', type: 'list', items: { type: 'string' }, label: 'Tags' },
            fieldWithDescription(
              {
                name: 'appearances',
                type: 'list',
                label: 'Appearances',
                items: {
                  type: 'object',
                  fields: [
                    { name: 'year', type: 'string', label: 'Year' },
                    { name: 'venue', type: 'string', label: 'Venue' },
                    fieldWithDescription(
                      { name: 'organizationSlug', type: 'string', label: 'Organization slug' },
                      'Slug from content/organizations/ (filename without .md).',
                    ),
                    { name: 'city', type: 'string', label: 'City' },
                    { name: 'notes', type: 'string', label: 'Notes' },
                  ],
                },
              },
              'Production history shown on the role detail page.',
            ),
          ],
        },
        {
          name: 'Organization',
          type: 'data',
          folder: 'content/organizations',
          fields: [
            { name: 'name', type: 'string', label: 'Name' },
            { name: 'city', type: 'string', label: 'City' },
            { name: 'country', type: 'string', label: 'Country' },
            { name: 'image', type: 'image', label: 'Image' },
            { name: 'summary', type: 'text', label: 'Summary' },
            { name: 'website', type: 'string', label: 'Website URL' },
            contentOrderField(),
          ],
        },
        {
          name: 'ScheduleEvent',
          type: 'data',
          folder: 'content/schedule',
          fields: [
            { name: 'title', type: 'string', label: 'Title' },
            fieldWithDescription(
              { name: 'subtitle', type: 'string', label: 'Subtitle' },
              'Second line on cards and detail (role, venue, or one-liner).',
            ),
            fieldWithDescription(
              { name: 'plot', type: 'text', label: 'Plot / description' },
              'Opera: short synopsis. Concert: event description. Optional — omit if not needed.',
            ),
            fieldWithDescription(
              { name: 'composer', type: 'string', label: 'Composer' },
              'Shows as “Music by” on detail. Omit for mixed programs, or use “Various composers”.',
            ),
            { name: 'venue', type: 'string', label: 'Venue' },
            { name: 'city', type: 'string', label: 'City' },
            fieldWithDescription(
              { name: 'videoUrl', type: 'string', label: 'YouTube URL (optional)' },
              'When set on a past event, shows as the first Photography tile and opens in the lightbox video player.',
            ),
            fieldWithDescription(
              { name: 'image', type: 'image', label: 'Card & detail image' },
              'Used on schedule cards, detail hero, and home Last Events. 4:5 works well for cards.',
            ),
            { name: 'imageAlt', type: 'string', label: 'Detail image alt' },
            fieldWithDescription(
              { name: 'organizationSlug', type: 'string', label: 'Organization slug' },
              'Slug from content/organizations/ — shows “Presented by” on detail.',
            ),
            fieldWithDescription(
              { name: 'roleSlug', type: 'string', label: 'Role slug' },
              'Operatic roles only. Links to /roles/… and pulls role-tagged gallery photos (past events).',
            ),
            fieldWithDescription(
              { name: 'gallerySlug', type: 'string', label: 'Gallery slug' },
              'Concerts / no operatic role. Same string as gallerySlug on photos. Past events only.',
            ),
            { name: 'ticketHref', type: 'string', label: 'Tickets URL (or /contact)' },
            fieldWithDescription(
              { name: 'externalUrl', type: 'string', label: 'External URL (optional)' },
              'Program page, press, or venue link — opens in a new tab on the event detail page.',
            ),
            fieldWithDescription(
              { name: 'badges', type: 'list', items: { type: 'string' }, label: 'Performance dates' },
              'Date labels on upcoming cards (e.g. June 12th). Past events use year if badges empty.',
            ),
            {
              name: 'cast',
              type: 'list',
              label: 'Cast',
              items: {
                type: 'object',
                fields: [
                  { name: 'character', type: 'string', label: 'Character' },
                  { name: 'performer', type: 'string', label: 'Performer' },
                ],
              },
            },
            {
              name: 'productionCredits',
              type: 'list',
              label: 'Production credits',
              items: {
                type: 'object',
                fields: [
                  {
                    name: 'position',
                    type: 'enum',
                    label: 'Position',
                    options: [
                      { label: 'Production (stage director)', value: 'production' },
                      { label: 'Conductor', value: 'conductor' },
                      { label: 'Set designer', value: 'setDesigner' },
                      { label: 'Costumes', value: 'costumes' },
                      { label: 'Lighting', value: 'lighting' },
                    ],
                  },
                  { name: 'name', type: 'string', label: 'Name' },
                ],
              },
            },
            fieldWithDescription(
              {
                name: 'status',
                type: 'enum',
                label: 'Status',
                options: [
                  { label: 'Upcoming', value: 'upcoming' },
                  { label: 'Past', value: 'past' },
                ],
              },
              'upcoming = Schedule “Upcoming” section. past = “Last Appearances” + photography on detail.',
            ),
            fieldWithDescription(
              { name: 'year', type: 'string', label: 'Year (past events)' },
              'Shown on past cards when badges are empty (e.g. 2023).',
            ),
            contentOrderField(),
          ],
        },
      ],
    }),
  ],
})
