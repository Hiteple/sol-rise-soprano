import type { Locale, NonDefaultLocale } from './locales'
import type { GalleryCategory } from '../gallery-categories'
import type { RoleCategory } from '../../../schemas/role-category'

export type UiMessages = {
  nav: Record<string, string>
  careerNav: {
    label: string
    overview: string
    overviewDesc: string
    performances: string
    performancesDesc: string
    organizations: string
    organizationsDesc: string
  }
  mediaNav: {
    label: string
    gallery: string
    galleryDesc: string
    videos: string
    videosDesc: string
  }
  footer: {
    navigate: string
    connect: string
    rights: string
    privacyLink: string
  }
  privacy: {
    lastUpdated: string
  }
  contact: {
    formPrivacyNotice: string
  }
  suggest: {
    title: Record<NonDefaultLocale, string>
    body: Record<NonDefaultLocale, string>
    accept: Record<NonDefaultLocale, string>
    stay: Record<NonDefaultLocale, string>
    dismiss: Record<NonDefaultLocale, string>
  }
  language: string
  notFound: {
    eyebrow: string
    title: string
    description: string
    backLabel: string
  }
  schedule: {
    upcoming: string
    pastAppearance: string
    lastAppearances: string
    filterAll: string
    filterOpera: string
    filterConcert: string
    filterAriaLabel: string
    musicBy: string
    presentedBy: string
    venue: string
    performanceDates: string
    moreDates: string
    solRise: string
    inquire: string
    getTickets: string
    viewProgram: string
    allEvents: string
    cast: string
    photography: string
    media: string
    notFound: {
      eyebrow: string
      title: string
      description: string
      backLabel: string
    }
    credits: {
      conductor: string
      production: string
      setDesigner: string
      costumes: string
      lighting: string
    }
  }
  organizations: {
    visitWebsite: string
  }
  gallery: {
    filterAriaLabel: string
    categories: Record<GalleryCategory, string>
    empty: {
      all: { title: string; description: string }
      photobook: { title: string; description: string }
      category: { title: string; description: string }
    }
  }
  role: {
    appearances: string
    performanceInfo: string
    composer: string
    opera: string
    venues: string
    years: string
    media: string
    featureImageAlt: string
    index: {
      filterAll: string
      filterAriaLabel: string
      categories: Record<RoleCategory, string>
      appearance: string
      appearances: string
      viewDetails: string
    }
    notFound: {
      eyebrow: string
      title: string
      description: string
      backLabel: string
    }
  }
}

const EN: UiMessages = {
  nav: {
    Home: 'Home',
    Bio: 'Bio',
    Career: 'Career',
    Schedule: 'Schedule',
    Gallery: 'Gallery',
    Media: 'Media',
    Videos: 'Videos',
    'Press Kit': 'Press Kit',
    Contact: 'Contact',
    Roles: 'Roles',
    Organizations: 'Organizations',
  },
  careerNav: {
    label: 'Career',
    overview: 'Overview',
    overviewDesc: 'Timeline and career milestones',
    performances: 'Performances',
    performancesDesc: 'Operatic roles and repertoire',
    organizations: 'Organizations',
    organizationsDesc: 'Opera houses and companies',
  },
  mediaNav: {
    label: 'Media',
    gallery: 'Gallery',
    galleryDesc: 'Stage, backstage and photo book',
    videos: 'Videos',
    videosDesc: 'Performance clips on YouTube',
  },
  footer: {
    navigate: 'Navigate',
    connect: 'Connect',
    rights: 'All rights reserved.',
    privacyLink: 'Privacy Policy',
  },
  privacy: {
    lastUpdated: 'Last updated',
  },
  contact: {
    formPrivacyNotice:
      'By submitting this form, you agree that we will use your name and email only to reply to your message. Read our',
  },
  suggest: {
    title: {
      es: '¿Prefieres leer en español?',
      de: 'Lieber auf Deutsch lesen?',
      it: 'Preferisci leggere in italiano?',
    },
    body: {
      es: 'Este sitio está disponible en español. Puedes cambiar el idioma en cualquier momento desde el menú.',
      de: 'Diese Website ist auch auf Deutsch verfügbar. Sie können die Sprache jederzeit im Menü wechseln.',
      it: 'Questo sito è disponibile anche in italiano. Puoi cambiare lingua in qualsiasi momento dal menu.',
    },
    accept: {
      es: 'Ver en español',
      de: 'Auf Deutsch anzeigen',
      it: 'Visualizza in italiano',
    },
    stay: {
      es: 'Continuar en inglés',
      de: 'Auf Englisch bleiben',
      it: 'Continua in inglese',
    },
    dismiss: {
      es: 'No volver a preguntar',
      de: 'Nicht mehr fragen',
      it: 'Non chiedere di nuovo',
    },
  },
  language: 'Language',
  notFound: {
    eyebrow: 'Lost in the wings',
    title: 'Page not found',
    description: 'The page you are looking for does not exist, may have moved, or is not yet published.',
    backLabel: 'Return home',
  },
  schedule: {
    upcoming: 'Upcoming',
    pastAppearance: 'Past appearance',
    lastAppearances: 'Last Appearances',
    filterAll: 'All',
    filterOpera: 'Opera',
    filterConcert: 'Concerts',
    filterAriaLabel: 'Filter past appearances',
    musicBy: 'Music by',
    presentedBy: 'Presented by',
    venue: 'Venue',
    performanceDates: 'Performance dates',
    moreDates: '+{count} more',
    solRise: 'Sol Risé',
    inquire: 'Inquire →',
    getTickets: 'Get tickets →',
    viewProgram: 'View program →',
    allEvents: '← All events',
    cast: 'Cast',
    photography: 'Photography',
    media: 'Media',
    notFound: {
      eyebrow: 'Schedule',
      title: 'Event not found',
      description:
        'This performance is not on the calendar — it may be unpublished, past, or the link may have changed.',
      backLabel: 'Back to schedule',
    },
    credits: {
      conductor: 'Conductor',
      production: 'Production',
      setDesigner: 'Set designer',
      costumes: 'Costumes',
      lighting: 'Lighting',
    },
  },
  organizations: {
    visitWebsite: 'Visit website',
  },
  gallery: {
    filterAriaLabel: 'Filter gallery by category',
    categories: {
      All: 'All',
      Stage: 'Stage',
      Backstage: 'Backstage',
      Photobook: 'Photobook',
    },
    empty: {
      all: {
        title: 'Gallery coming soon',
        description: 'Photography from stage and backstage will be added here shortly!',
      },
      photobook: {
        title: 'Photobook coming soon',
        description: 'Portrait and editorial photography will be added here soon.',
      },
      category: {
        title: 'Nothing in {category} yet',
        description: 'New images in this category will be added here soon!',
      },
    },
  },
  role: {
    appearances: 'Appearances',
    performanceInfo: 'Performance Information',
    composer: 'Composer',
    opera: 'Opera',
    venues: 'Venues',
    years: 'Years',
    media: 'Media',
    featureImageAlt: 'Sol Risé as {character} in {opera}',
    index: {
      filterAll: 'All',
      filterAriaLabel: 'Filter performances by category',
      categories: {
        lead: 'Lead',
        supporting: 'Supporting',
        ensemble: 'Ensemble',
      },
      appearance: 'appearance',
      appearances: 'appearances',
      viewDetails: 'View Details',
    },
    notFound: {
      eyebrow: 'Career · Performances',
      title: 'Role not found',
      description:
        'This role is not in the repertoire listing yet — it may be unpublished or the link may be outdated.',
      backLabel: 'Back to roles',
    },
  },
}

const ES: UiMessages = {
  nav: {
    Home: 'Inicio',
    Bio: 'Bio',
    Career: 'Trayectoria',
    Schedule: 'Calendario',
    Gallery: 'Galería',
    Media: 'Media',
    Videos: 'Videos',
    'Press Kit': 'Press Kit',
    Contact: 'Contacto',
    Roles: 'Roles',
    Organizations: 'Instituciones',
  },
  careerNav: {
    label: 'Trayectoria',
    overview: 'Resumen',
    overviewDesc: 'Línea de tiempo y hitos',
    performances: 'Interpretaciones',
    performancesDesc: 'Roles operísticos y repertorio',
    organizations: 'Instituciones',
    organizationsDesc: 'Teatros y compañías',
  },
  mediaNav: {
    label: 'Media',
    gallery: 'Galería',
    galleryDesc: 'Escenario, bastidores y photo book',
    videos: 'Videos',
    videosDesc: 'Fragmentos en YouTube',
  },
  footer: {
    navigate: 'Navegar',
    connect: 'Conectar',
    rights: 'Todos los derechos reservados.',
    privacyLink: 'Política de privacidad',
  },
  privacy: {
    lastUpdated: 'Última actualización',
  },
  contact: {
    formPrivacyNotice:
      'Al enviar este formulario, aceptas que usemos tu nombre y correo únicamente para responder tu consulta. Consulta nuestra',
  },
  suggest: EN.suggest,
  language: 'Idioma',
  notFound: {
    eyebrow: 'Fuera de escena',
    title: 'Página no encontrada',
    description: 'La página que buscas no existe, pudo haberse movido o aún no está publicada.',
    backLabel: 'Volver al inicio',
  },
  schedule: {
    upcoming: 'Próximas',
    pastAppearance: 'Aparición pasada',
    lastAppearances: 'Últimas apariciones',
    filterAll: 'Todas',
    filterOpera: 'Ópera',
    filterConcert: 'Conciertos',
    filterAriaLabel: 'Filtrar apariciones pasadas',
    musicBy: 'Música de',
    presentedBy: 'Presentado por',
    venue: 'Lugar',
    performanceDates: 'Fechas de función',
    moreDates: '+{count} más',
    solRise: 'Sol Risé',
    inquire: 'Consultar →',
    getTickets: 'Entradas →',
    viewProgram: 'Ver programa →',
    allEvents: '← Todos los eventos',
    cast: 'Elenco',
    photography: 'Fotografía',
    media: 'Medios',
    notFound: {
      eyebrow: 'Calendario',
      title: 'Evento no encontrado',
      description:
        'Esta función no figura en el calendario — puede estar sin publicar, ser pasada o el enlace haber cambiado.',
      backLabel: 'Volver al calendario',
    },
    credits: {
      conductor: 'Director',
      production: 'Puesta en escena',
      setDesigner: 'Escenografía',
      costumes: 'Vestuario',
      lighting: 'Iluminación',
    },
  },
  organizations: {
    visitWebsite: 'Visitar sitio web',
  },
  gallery: {
    filterAriaLabel: 'Filtrar galería por categoría',
    categories: {
      All: 'Todas',
      Stage: 'Escenario',
      Backstage: 'Entre bastidores',
      Photobook: 'Photo book',
    },
    empty: {
      all: {
        title: 'Galería próximamente',
        description: '¡Pronto sumaremos fotografías de escena y entre bastidores!',
      },
      photobook: {
        title: 'Photo book próximamente',
        description: 'Retratos y fotografía editorial se sumarán aquí pronto.',
      },
      category: {
        title: 'Aún no hay imágenes en {category}',
        description: '¡Pronto sumaremos nuevas fotos en esta categoría!',
      },
    },
  },
  role: {
    appearances: 'Apariciones',
    performanceInfo: 'Información de la interpretación',
    composer: 'Compositor',
    opera: 'Ópera',
    venues: 'Escenarios',
    years: 'Años',
    media: 'Medios',
    featureImageAlt: 'Sol Risé como {character} en {opera}',
    index: {
      filterAll: 'Todas',
      filterAriaLabel: 'Filtrar interpretaciones por categoría',
      categories: {
        lead: 'Principal',
        supporting: 'Secundario',
        ensemble: 'Conjunto',
      },
      appearance: 'aparición',
      appearances: 'apariciones',
      viewDetails: 'Ver detalles',
    },
    notFound: {
      eyebrow: 'Trayectoria · Interpretaciones',
      title: 'Rol no encontrado',
      description:
        'Este rol aún no figura en el repertorio — puede estar sin publicar o el enlace estar desactualizado.',
      backLabel: 'Volver a roles',
    },
  },
}

const DE: UiMessages = {
  nav: {
    Home: 'Start',
    Bio: 'Bio',
    Career: 'Werdegang',
    Schedule: 'Termine',
    Gallery: 'Galerie',
    Media: 'Medien',
    Videos: 'Videos',
    'Press Kit': 'Press Kit',
    Contact: 'Kontakt',
    Roles: 'Rollen',
    Organizations: 'Institutionen',
  },
  careerNav: {
    label: 'Werdegang',
    overview: 'Überblick',
    overviewDesc: 'Zeitleiste und Meilensteine',
    performances: 'Aufführungen',
    performancesDesc: 'Opernrollen und Repertoire',
    organizations: 'Institutionen',
    organizationsDesc: 'Opernhäuser und Compagnien',
  },
  mediaNav: {
    label: 'Medien',
    gallery: 'Galerie',
    galleryDesc: 'Bühne, Backstage und Fotobuch',
    videos: 'Videos',
    videosDesc: 'Aufführungsausschnitte auf YouTube',
  },
  footer: {
    navigate: 'Navigation',
    connect: 'Kontakt',
    rights: 'Alle Rechte vorbehalten.',
    privacyLink: 'Datenschutzerklärung',
  },
  privacy: {
    lastUpdated: 'Zuletzt aktualisiert',
  },
  contact: {
    formPrivacyNotice:
      'Mit dem Absenden dieses Formulars willigst du ein, dass wir deinen Namen und deine E-Mail-Adresse nur zur Beantwortung deiner Anfrage verwenden. Siehe unsere',
  },
  suggest: EN.suggest,
  language: 'Sprache',
  notFound: {
    eyebrow: 'Hinter der Kulisse',
    title: 'Seite nicht gefunden',
    description: 'Die gesuchte Seite existiert nicht, wurde verschoben oder ist noch nicht veröffentlicht.',
    backLabel: 'Zur Startseite',
  },
  schedule: {
    upcoming: 'Bevorstehend',
    pastAppearance: 'Vergangener Auftritt',
    lastAppearances: 'Letzte Auftritte',
    filterAll: 'Alle',
    filterOpera: 'Oper',
    filterConcert: 'Konzerte',
    filterAriaLabel: 'Vergangene Auftritte filtern',
    musicBy: 'Musik von',
    presentedBy: 'Präsentiert von',
    venue: 'Spielort',
    performanceDates: 'Aufführungstermine',
    moreDates: '+{count} weitere',
    solRise: 'Sol Risé',
    inquire: 'Anfragen →',
    getTickets: 'Tickets →',
    viewProgram: 'Programm ansehen →',
    allEvents: '← Alle Termine',
    cast: 'Besetzung',
    photography: 'Fotografie',
    media: 'Medien',
    notFound: {
      eyebrow: 'Termine',
      title: 'Termin nicht gefunden',
      description:
        'Dieser Auftritt steht nicht im Kalender — er ist vielleicht unveröffentlicht, vergangen oder der Link hat sich geändert.',
      backLabel: 'Zurück zu Terminen',
    },
    credits: {
      conductor: 'Dirigent',
      production: 'Inszenierung',
      setDesigner: 'Bühnenbild',
      costumes: 'Kostüme',
      lighting: 'Licht',
    },
  },
  organizations: {
    visitWebsite: 'Website besuchen',
  },
  gallery: {
    filterAriaLabel: 'Galerie nach Kategorie filtern',
    categories: {
      All: 'Alle',
      Stage: 'Bühne',
      Backstage: 'Backstage',
      Photobook: 'Photobook',
    },
    empty: {
      all: {
        title: 'Galerie folgt in Kürze',
        description: 'Bühnen- und Backstage-Fotos werden hier bald ergänzt!',
      },
      photobook: {
        title: 'Photobook folgt in Kürze',
        description: 'Porträt- und Editorial-Fotografie wird hier bald ergänzt.',
      },
      category: {
        title: 'Noch nichts in {category}',
        description: 'Neue Bilder in dieser Kategorie folgen bald!',
      },
    },
  },
  role: {
    appearances: 'Auftritte',
    performanceInfo: 'Aufführungsinformationen',
    composer: 'Komponist',
    opera: 'Oper',
    venues: 'Spielorte',
    years: 'Jahre',
    media: 'Medien',
    featureImageAlt: 'Sol Risé als {character} in {opera}',
    index: {
      filterAll: 'Alle',
      filterAriaLabel: 'Aufführungen nach Kategorie filtern',
      categories: {
        lead: 'Hauptrolle',
        supporting: 'Nebenrolle',
        ensemble: 'Ensemble',
      },
      appearance: 'Auftritt',
      appearances: 'Auftritte',
      viewDetails: 'Details ansehen',
    },
    notFound: {
      eyebrow: 'Werdegang · Aufführungen',
      title: 'Rolle nicht gefunden',
      description:
        'Diese Rolle ist noch nicht im Repertoire gelistet — sie ist vielleicht unveröffentlicht oder der Link veraltet.',
      backLabel: 'Zurück zu Rollen',
    },
  },
}

const IT: UiMessages = {
  nav: {
    Home: 'Home',
    Bio: 'Bio',
    Career: 'Percorso',
    Schedule: 'Calendario',
    Gallery: 'Galleria',
    Media: 'Media',
    Videos: 'Video',
    'Press Kit': 'Press Kit',
    Contact: 'Contatti',
    Roles: 'Ruoli',
    Organizations: 'Istituzioni',
  },
  careerNav: {
    label: 'Percorso',
    overview: 'Panoramica',
    overviewDesc: 'Cronologia e traguardi',
    performances: 'Interpretazioni',
    performancesDesc: 'Ruoli operistici e repertorio',
    organizations: 'Istituzioni',
    organizationsDesc: 'Teatri e compagnie',
  },
  mediaNav: {
    label: 'Media',
    gallery: 'Galleria',
    galleryDesc: 'Palcoscenico, backstage e photo book',
    videos: 'Video',
    videosDesc: 'Estratti su YouTube',
  },
  footer: {
    navigate: 'Naviga',
    connect: 'Contatti',
    rights: 'Tutti i diritti riservati.',
    privacyLink: 'Informativa sulla privacy',
  },
  privacy: {
    lastUpdated: 'Ultimo aggiornamento',
  },
  contact: {
    formPrivacyNotice:
      'Inviando questo modulo, acconsenti all\'uso del tuo nome e della tua e-mail solo per rispondere al tuo messaggio. Leggi la nostra',
  },
  suggest: EN.suggest,
  language: 'Lingua',
  notFound: {
    eyebrow: 'Dietro le quinte',
    title: 'Pagina non trovata',
    description: 'La pagina che cerchi non esiste, potrebbe essere stata spostata o non è ancora pubblicata.',
    backLabel: 'Torna alla home',
  },
  schedule: {
    upcoming: 'In programma',
    pastAppearance: 'Apparizione passata',
    lastAppearances: 'Ultime apparizioni',
    filterAll: 'Tutte',
    filterOpera: 'Opera',
    filterConcert: 'Concerti',
    filterAriaLabel: 'Filtra apparizioni passate',
    musicBy: 'Musica di',
    presentedBy: 'Presentato da',
    venue: 'Luogo',
    performanceDates: 'Date di rappresentazione',
    moreDates: '+{count} altre',
    solRise: 'Sol Risé',
    inquire: 'Richiedi →',
    getTickets: 'Biglietti →',
    viewProgram: 'Vedi programma →',
    allEvents: '← Tutti gli eventi',
    cast: 'Cast',
    photography: 'Fotografia',
    media: 'Media',
    notFound: {
      eyebrow: 'Calendario',
      title: 'Evento non trovato',
      description:
        'Questa rappresentazione non è in calendario — potrebbe essere non pubblicata, passata o il link potrebbe essere cambiato.',
      backLabel: 'Torna al calendario',
    },
    credits: {
      conductor: 'Direttore',
      production: 'Regia',
      setDesigner: 'Scenografia',
      costumes: 'Costumi',
      lighting: 'Luci',
    },
  },
  organizations: {
    visitWebsite: 'Visita il sito',
  },
  gallery: {
    filterAriaLabel: 'Filtra galleria per categoria',
    categories: {
      All: 'Tutte',
      Stage: 'Palcoscenico',
      Backstage: 'Backstage',
      Photobook: 'Photobook',
    },
    empty: {
      all: {
        title: 'Galleria in arrivo',
        description: 'Presto aggiungeremo fotografie di palcoscenico e backstage!',
      },
      photobook: {
        title: 'Photobook in arrivo',
        description: 'Ritratti e fotografia editoriale saranno aggiunti qui a breve.',
      },
      category: {
        title: 'Nessuna immagine in {category} per ora',
        description: 'Nuove foto in questa categoria arriveranno presto!',
      },
    },
  },
  role: {
    appearances: 'Apparizioni',
    performanceInfo: 'Informazioni sull\'interpretazione',
    composer: 'Compositore',
    opera: 'Opera',
    venues: 'Teatri',
    years: 'Anni',
    media: 'Media',
    featureImageAlt: 'Sol Risé come {character} in {opera}',
    index: {
      filterAll: 'Tutte',
      filterAriaLabel: 'Filtra interpretazioni per categoria',
      categories: {
        lead: 'Principale',
        supporting: 'Secondario',
        ensemble: 'Ensemble',
      },
      appearance: 'apparizione',
      appearances: 'apparizioni',
      viewDetails: 'Vedi dettagli',
    },
    notFound: {
      eyebrow: 'Percorso · Interpretazioni',
      title: 'Ruolo non trovato',
      description:
        'Questo ruolo non è ancora nel repertorio — potrebbe essere non pubblicato o il link potrebbe essere obsoleto.',
      backLabel: 'Torna ai ruoli',
    },
  },
}

const MESSAGES: Record<Locale, UiMessages> = { en: EN, es: ES, de: DE, it: IT }

export function getUiMessages(locale: Locale): UiMessages {
  return MESSAGES[locale] ?? EN
}

/** Translate a nav label key (English source from content) to the active locale. */
export function translateNavLabel(englishLabel: string, locale: Locale): string {
  if (locale === 'en') return englishLabel
  return getUiMessages(locale).nav[englishLabel] ?? englishLabel
}

/** Display label for a role category — markdown values stay `lead` / `supporting` / `ensemble`. */
export function roleCategoryLabel(category: RoleCategory, locale: Locale): string {
  return getUiMessages(locale).role.index.categories[category]
}

/** Singular or plural “appearance(s)” for role index cards. */
export function roleAppearanceCountLabel(count: number, locale: Locale): string {
  const labels = getUiMessages(locale).role.index
  return count === 1 ? labels.appearance : labels.appearances
}

/** Display label for a gallery tab — markdown `category` values stay English. */
export function galleryCategoryLabel(category: string, locale: Locale): string {
  const labels = getUiMessages(locale).gallery.categories
  if (category in labels) return labels[category as GalleryCategory]
  return category
}

export function galleryCategoryEmptyMessages(
  category: string,
  locale: Locale,
): { title: string; description: string } {
  const empty = getUiMessages(locale).gallery.empty
  if (category === 'All') return empty.all
  if (category === 'Photobook') return empty.photobook
  const label = galleryCategoryLabel(category, locale)
  return {
    title: empty.category.title.replace('{category}', label),
    description: empty.category.description,
  }
}
