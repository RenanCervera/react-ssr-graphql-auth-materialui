export const GA_TRACKING_ID = '<YOUR_GA_TRACKING_ID>'

export const pageview = url => {
    window.gtag('config', GA_TRACKING_ID, {
        page_location: url,
    })
}

export const event = ({ action, category, label, value }) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}