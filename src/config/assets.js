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
        VIDEO: getAssetUrl("hero_interior.mp4"),
        POSTER: getAssetUrl("hero_interior.png"),
    },

    // BELIEF SECTION
    BELIEF: {
        VIDEO_DESKTOP: getAssetUrl("belief_vid.mp4"),
        VIDEO_MOBILE: getAssetUrl("belief_vid_2.mp4"),
        BG_GRADIENT: getAssetUrl("belief_bg.png"), // If used
    },

    // SERVICES SECTION
    SERVICES: {
        INTERACTIVE: getAssetUrl("service_interactive.png"),
        CINEMATIC: getAssetUrl("service_cinematic.png"),
        ULTRA_REAL: getAssetUrl("service_ultra_real.png"),
        PIXEL: getAssetUrl("service_pixel.png"),
        VR: getAssetUrl("service_vr.png"),
    },

    // PROJECTS (CASE STUDY)
    PROJECTS: {
        AADHYA_SERENE: getAssetUrl("aadhya_serene_2.png"), // Using the lighter file if possible
        SKYLINE: getAssetUrl("skyline_balcony.png"),
    },

    // WHY STHYRA SECTION
    WHY_STHYRA: {
        IMAGE_1: getAssetUrl("why_sthyra_1.png"),
        IMAGE_2: getAssetUrl("why_sthyra_2_v2.png"),
        IMAGE_3: getAssetUrl("why_sthyra_3.png"),
        IMAGE_4: getAssetUrl("why_sthyra_4.png"),
    },

    // VISUALIZATION GAP SECTION
    VIS_GAP: {
        FLOOR_PLAN: getAssetUrl("floor_plan.png"),
        RENDER: getAssetUrl("interior_render.png"),
    },

    // GLOBAL
    GLOBAL: {
        LOGO: getAssetUrl("logo.png"),
        BUTTERFLY_GLB: getAssetUrl("butterfly.gltf"), // Or .glb depending on what's used
    }
};
