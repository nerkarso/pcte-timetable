const fs = require('fs');

const contents = `
workbox.routing.registerRoute(
  /\\/api\\/timetables\\/latest/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'latest-timetable',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 24 * 60 * 60, // 1 day
      }),
    ],
  }),
);
`;

fs.appendFile('build/service-worker.js', contents, function (err) {
  if (err) throw err;
  console.log('New contents added to service-worker.js');
});
