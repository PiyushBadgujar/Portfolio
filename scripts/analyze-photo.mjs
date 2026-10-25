import sharp from 'sharp';

async function analyze() {
  const image = sharp('public/profile.jpeg');
  const metadata = await image.metadata();
  console.log('Metadata:', metadata);
  
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  console.log('Channels:', info.channels, 'Width:', info.width, 'Height:', info.height);
  
  // Sample corners: (0,0), (width-1, 0), (0, 100), (width-1, 100)
  function getPixel(x, y) {
    const idx = (y * info.width + x) * info.channels;
    return [data[idx], data[idx+1], data[idx+2]];
  }
  
  console.log('Top-Left (0,0):', getPixel(0, 0));
  console.log('Top-Right (w-1,0):', getPixel(info.width - 1, 0));
  console.log('Top-Center (w/2, 5):', getPixel(Math.floor(info.width / 2), 5));
  console.log('Mid-Left (5, h/2):', getPixel(5, Math.floor(info.height / 2)));
  console.log('Mid-Right (w-5, h/2):', getPixel(info.width - 5, Math.floor(info.height / 2)));
  console.log('Bottom-Left corner (0, h-1):', getPixel(0, info.height - 1));
  console.log('Bottom-Right corner (w-1, h-1):', getPixel(info.width - 1, info.height - 1));
}

analyze().catch(console.error);
