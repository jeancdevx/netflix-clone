const Movie = ({ videoUrl, handleMouseMove }) => {
  return (
    <video
      className='w-full h-full '
      src={videoUrl}
      controls
      autoPlay
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseMove}
    />
  )
}

export default Movie
