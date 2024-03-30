import { Link } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getUsersFromLocalStorage from '../../utils/getDataUser';
function CardsBooks() {
	const [books, setBooks] = useState([]);
	const [genres, setGenres] = useState([]);
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		const fetchBooksAndGenres = async () => {
			try {
				const booksResponse = await axios.get('/book');
				const genresResponse = await axios.get('/genres');
				const authorsResponse = await axios.get('/author');
				setBooks(booksResponse.data);
				setGenres(genresResponse.data);
				setAuthors(authorsResponse.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchBooksAndGenres();
	}, []);
	const handleClick = (event) => {
		if (event.currentTarget.disabled) {
			event.preventDefault();
		}
	};
	const isPremiumUser = () => {
		const premiumUser = getUsersFromLocalStorage()[4];

		return premiumUser;
	};
	return (
		<div className="grid grid-cols-3 gap-4">
			{books.map((book, index) => {
				const author = authors.find(
					(author) => author._id === book.author,
				);

				return (
					<div
						key={index}
						className="relative flex flex-col mt-6 text-gray-700 bg-white  bg-clip-border rounded-xl w-96"
						style={{
							boxShadow:
								'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
						}}
					>
						<div className=" mx-auto">
							{book.images &&
								book.images.map((imageUrl, imageIndex) => (
									<div key={imageIndex}>
										<img
											src={imageUrl}
											alt={`book-image-${imageIndex}`}
											className="w-50"
										/>
									</div>
								))}
						</div>

						<div className="p-6">
							<h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
								{book.name}
							</h5>
							<p className="flex flex-col justify-start font-sans text-base antialiased font-light leading-relaxed text-inherit">
								<div
									className="flex flex-col justify-start font-sans text-base antialiased font-light leading-relaxed text-inherit"
									dangerouslySetInnerHTML={{
										__html:
											book.content.length > 100
												? book.content.substring(
														0,
														100,
													) + '...'
												: book.content,
									}}
								></div>
								<div className="flex">
									{book.genres.map((genreId) => {
										const genre = genres.find(
											(genre) => genre._id === genreId,
										);
										return genre ? (
											<Link to={`/genres/${genre._id}`}>
												<a
													className="bg-blue-gray-100 w-fit p-1 text-xs italic rounded-md cursor-pointer m-1"
													key={genre._id}
												>
													<span className="m-2">
														#{genre.name}
													</span>
												</a>
											</Link>
										) : null;
									})}
								</div>
								<div className="flex">
									{author ? (
										<Link to={`/author/${author._id}`}>
											<span
												className="bg-blue-gray-100 w-fit p-1 text-xs italic rounded-md cursor-pointer m-1"
												key={index}
											>
												<span className="m-2">
													@{author.name}
												</span>
											</span>
										</Link>
									) : null}
								</div>
							</p>
						</div>

						<div className="p-6 pt-0">
                        <Link
        to={
          book.premium && !isPremiumUser()
            ? '/pricing'
            : `/book/${book._id}`
        }
      >
        <button
          className={`align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ${
            book.premium && !isPremiumUser()
              ? 'disabled:opacity-50 bg-yellow-400 disabled:shadow-none disabled:pointer-events-none '
              : ''
          }`}
          type="button"
          disabled={book.premium && !isPremiumUser()}
          onClick={handleClick}
        >
          {book.premium ? (
            <FontAwesomeIcon icon={faCrown} />
          ) : (
            'Đọc thêm'
          )}
        </button>
      </Link>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CardsBooks;
