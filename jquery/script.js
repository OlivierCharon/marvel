// $(document).ready(() => {
//     $('img').on('click', () => {
//         $('img').css('width', '50px');
//         console.log(this);
//     });
//
//     $.ajax({
//         url: 'https://gateway.marvel.com:443/v1/public/events?orderBy=startDate&limit=100&ts=1&apikey=d5b0ab032c96bf018aabe59d6e2b0f9d&hash=f856807381477e356ae1d97b3ae195b6',
//         success: (data) => {
//             console.log(data);
//
//         },
//
//         statusCode: {
//             200: () => {
//                 console.log('200');
//                 console.warn('200');
//                 console.error('200');
//             },
//             404: () => {
//                 console.error('404');
//             }
//         }
//     })
// });