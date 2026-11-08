export const PATHS = {
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7z', users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  trophy: 'M7 4h10v5a5 5 0 0 1-10 0zM7 6H3v2a4 4 0 0 0 4 4M17 6h4v2a4 4 0 0 1-4 4M12 14v4M8 21h8M10 18h4', crown: 'm3 8 4 4 5-7 5 7 4-4-2 11H5z',
  dumbbell: 'M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12', layers: 'm12 3 9 5-9 5-9-5zM3 13l9 5 9-5', cap: 'm12 4 10 5-10 5L2 9zM6 12v5c3 3 9 3 12 0v-5',
  chart: 'M5 20V14M12 20V8M19 20V3', close: 'M6 6l12 12M18 6 6 18', left: 'M15 5l-7 7 7 7', right: 'M9 5l7 7-7 7', pin: 'M12 22s7-6.500 7-12a7 7 0 0 0-14 0c0 5.500 7 12 7 12zM12 12a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5z',
  send: 'M22 3 2 11l7 2.500L11.500 21l3.500-5.500L20 19z', flame: 'M12 22c4 0 7-3 7-7 0-4-3-6-4-10-3 2-4 5-4 7-1-1-2-2-2-4-2 2-4 5-4 7 0 4 3 7 7 7z',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', down: 'M12 5v14M6 13l6 6 6-6', play: 'M8 5v14l11-7z', route: 'M9 20l-5-2V4l5 2m0 14 6-2m-6 2V6m6 12 5 2V6l-5-2m0 14V4m0 0L9 6',
  phone: 'M5 3h4l2 5-2.500 1.500a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z', vk: 'M3 7h3c1 4 3 6 4 6V7h3v4c1 0 3-2 4-4h3c-1 3-3 5-4 6 1 .5 3 2 4 5h-3c-1-2-2.500-3-4-3v3h-1C7 18 3 13 3 7z', ig: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
}
export const Icon = ({ n, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={PATHS[n]} /></svg>
)
