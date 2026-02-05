// CENTRAL ASSET CONFIGURATION
// Step 1: Upload your files to S3.
// Step 2: Update 'S3_BUCKET_URL' below with your actual bucket URL (e.g., "https://sthyra-assets.s3.amazonaws.com").
// Step 3: Ensure the file names in your bucket match the names below.

const S3_BUCKET_URL = "https://sthyra-web.s3.ap-south-1.amazonaws.com/s3_bundle";

const getAssetUrl = (path) => {
    if (!S3_BUCKET_URL) return `/assets/${path}`; // Default to local
    return `${S3_BUCKET_URL}/${path}`;
};

export const ASSETS = {
    // HERO SECTION
    HERO: {
        VIDEO: getAssetUrl("hero_interior.mp4"), // Standard/Optimized
        VIDEO_HQ: getAssetUrl("hero_interior.mp4"), // Place High Quality 4K version here
        POSTER: getAssetUrl("hero_interior.png"),
    },

    // BELIEF SECTION
    BELIEF: {
        VIDEO_DESKTOP: getAssetUrl("belief_vid.mp4"),
        VIDEO_DESKTOP_HQ: getAssetUrl("belief_vid.mp4"), // Place High Quality version here
        VIDEO_MOBILE: getAssetUrl("belief_vid_2.mp4"),
        BG_GRADIENT: getAssetUrl("belief_bg.webp"),
    },

    // SERVICES SECTION
    SERVICES: {
        INTERACTIVE: getAssetUrl("service_interactive.webp"),
        MOBILE_INTERACTIVE: getAssetUrl("mobile_website_inetractivity.webp"),
        CINEMATIC: getAssetUrl("service_cinematic.webp"),
        ULTRA_REAL: getAssetUrl("service_ultra_real.webp"),
        PIXEL: getAssetUrl("service_pixel.webp"),
        MOBILE_PIXEL: getAssetUrl("mobile_service_pixel.webp"),
        VR: getAssetUrl("service_vr.webp"),
    },

    // PROJECTS (CASE STUDY)
    PROJECTS: {
        AADHYA_SERENE: getAssetUrl("aadhya_serene_2.webp"),
        SKYLINE: getAssetUrl("skyline_balcony.webp"),
    },

    // WHY STHYRA SECTION
    WHY_STHYRA: {
        IMAGE_1: getAssetUrl("why_sthyra_1.webp"),
        IMAGE_2: getAssetUrl("why_sthyra_2_v2.webp"), // Optimized WebP
        IMAGE_3: getAssetUrl("why_sthyra_3.webp"),
        IMAGE_4: getAssetUrl("why_sthyra_4.webp"),
    },

    // VISUALIZATION GAP SECTION
    VIS_GAP: {
        FLOOR_PLAN: getAssetUrl("floor_plan.png"),
        RENDER: getAssetUrl("interior_render.webp"), // Optimized WebP
    },

    // GLOBAL
    GLOBAL: {
        LOGO: getAssetUrl("sthyra_logo_new.png"),
        FOOTER_LOGO: getAssetUrl("sthyra_logo_new.png"),
        BUTTERFLY_GLB: getAssetUrl("butterfly.gltf"), // Or .glb depending on what's used
    }
};
