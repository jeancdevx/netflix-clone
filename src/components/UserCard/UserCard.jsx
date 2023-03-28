import images from './UserCard.constants'

const UserCard = ({ name }) => {
  const imgSrc = images[Math.floor(Math.random() * 4)]

  return (
    <article className='group flex-row w-44 mx-auto'>
      <figure className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
        <img
          draggable={false}
          className='w-max h-max object-contain'
          src={imgSrc}
          alt=''
        />
      </figure>
      <p className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
        {name}
      </p>
    </article>
  )
}

export default UserCard
