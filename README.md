# Welcome to CodeVerse Hub! 🚀

![CodeVerse Hub](https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

Ahoy, fellow space adventurers! Welcome to **CodeVerse Hub**, the intergalactic epicenter of all things code-tastic! Whether you're a seasoned astronaut navigating the vast cosmos of coding or just a fledgling explorer looking to launch your coding journey, you've come to the right place. Prepare for a cosmic adventure like no other as we embark on a journey through the stars of coding languages, libraries, and beyond!

## 🌟 Why Choose CodeVerse Hub?

### Coding Constellations
Dive into our galaxy of coding languages, each shining bright like a coding star waiting to be discovered! From the ancient runes of JavaScript to the futuristic hieroglyphics of Rust and Go, our constellation of languages will leave you starstruck and ready to conquer the coding universe!

### Sweet Coding Embrace
Join our warm and fuzzy coding community, where bugs are just cute little features in disguise! Get ready to cuddle up with fellow coders, swap stories of code triumphs and tribulations, and maybe even find your coding soulmate along the way. After all, what's a coding journey without a little companionship?

### Coder's Delight
Whether you're a coding connoisseur or a newbie astronaut, CodeVerse Hub is the perfect launchpad for your coding adventures. With resources, tutorials, and a community as vibrant as a supernova, the sky's the limit (and even that's debatable)! So grab your space suit, pack your favorite text editor, and get ready for a journey that's out of this world!

## 🚀 Getting Started

1. **Install Dependencies**: Run `npm install` to fuel up your spacecraft with all the necessary dependencies for the project. Don't forget to check for any interstellar updates along the way!

2. **Set Up Environment**: Create a `.env` file based on the `.env.example` file and add your environment variables. Remember, our secret space sauce is safe with you! Just don't let it fall into the wrong hands...

3. **Start the Server**: Blast off by running `npm start` to fire up the Express server. Your app will be served at `http://localhost:3000` by default. Engage thrusters and prepare for liftoff!

4. **Explore and Enjoy**: Once the server is up and running, navigate the cosmos of CodeVerse Hub. Explore different sections like languages, libraries, and contact pages. Who knows what cosmic wonders await? Remember, the journey is just as important as the destination!

## 🛠️ Technologies & Stack

- **Express.js**: Our trusty spacecraft for navigating the wild frontier of web applications. With Express.js at the helm, we're ready to soar through the digital cosmos with ease.

- **EJS (Embedded JavaScript)**: A powerful templating engine for generating HTML with the finesse of a cosmic wizard. With EJS, our pages come to life like constellations in the night sky.

- **Tailwind CSS / Flowbite**: The warp drive of our design, allowing us to craft custom interfaces at warp speed. With Tailwind CSS and Flowbite, our designs are as sleek and stylish as a starship on its maiden voyage.

- **dotenv**: Our shield against the vacuum of space, keeping our environment variables safe and sound. With dotenv, our secrets remain secure, hidden away from prying eyes in the depths of space.

#### Retrieving Programming Languages

- **Endpoint**: `/programming-languages`
- **Method**: `GET`
- **Description**: Returns a list of programming languages along with their details.
- **Example**:
  ```bash
  curl -X GET https://raw.githubusercontent.com/DenGian/API-Collection/main/assets/json/programming-languages.json
  ```

  #### Retrieving Related Libraries

- **Endpoint**: `/related-libraries/:id`
- **Method**: `GET`
- **Description**: Returns the related library information for a specific programming language identified by its ID.
- **Parameters**:
  - `id`: The ID of the programming language.
- **Example**:
  ```bash
  curl -X GET https://raw.githubusercontent.com/DenGian/API-Collection/main/assets/json/related-libraries.json/LANG-001
  ```

  ### Response Format

The API returns data in JSON format. Here's an example response for retrieving programming languages:

```json
[
	{
		"id": "LANG-001",
		"name": "Python",
		"description": "Python is a versatile programming language used for web development, data analysis, machine learning, and more.",
		"age": 33,
		"isActive": true,
		"birthdate": "1991-02-20",
		"imageUrl": "https://raw.githubusercontent.com/DenGian/API-Collection/main/assets/images/Angular.webp",
		"genre": "General purpose",
		"useCases": ["Web Development", "Data Analysis", "Machine Learning"],
		"relatedLibrary": {
			"id": "LIB-101",
			"name": "Django",
			"imageUrl": "https://raw.githubusercontent.com/DenGian/API-Collection/main/assets/images/Django.webp",
			"description": "Django is a high-level web framework written in Python that enables rapid web development.",
			"website": "https://www.djangoproject.com/",
			"stars": 50700,
			"latestVersion": "3.2.12"
		}
	}
	// More programming languages...
]
```

### Error Handling 🛑

Our cosmic journey through the digital cosmos isn't always smooth sailing. Sometimes, we encounter cosmic anomalies and unexpected asteroid fields that can throw our spacecraft off course. But fear not, fellow space adventurers! With CodeVerse Hub's robust error handling mechanisms, you'll navigate through the darkest corners of space with confidence and grace.

#### Standard HTTP Status Codes 🚥

The API follows the standard HTTP status codes for error handling. Here's a quick guide to help you decipher the cosmic signals:

- **404 Not Found**: You've ventured too far into uncharted territory, and the resource you seek eludes your grasp. But fear not, for even in the vast expanse of space, there's always more to discover!

- **500 Internal Server Error**: Uh-oh! It seems we've encountered a cosmic hiccup on our journey. Don't panic; our engineers are hard at work behind the scenes to restore order to the chaos.

#### Custom Error Handling Middleware 🛠️

To ensure smooth navigation through the digital cosmos, CodeVerse Hub employs custom error handling middleware. This middleware intercepts errors thrown during the journey and ensures they're gracefully handled, preventing catastrophic system failures.

In the event of an error, the middleware renders custom error pages tailored to each situation. Whether it's a gentle reminder that the resource you seek is beyond the reaches of known space or a reassuring message that our engineers are working tirelessly to restore order, CodeVerse Hub's error handling middleware has you covered.

So strap in, hold on to your space helmets, and prepare for the occasional cosmic turbulence. With CodeVerse Hub's error handling at your side, you'll navigate through the digital cosmos like a seasoned astronaut.

## Contributors

- [Ian Mondelaers](https://github.com/DenGian) - Creator and maintainer

## 🌠 Contributing

We welcome contributions from the far reaches of the galaxy! Whether it's fixing a bug, adding a new feature, or suggesting enhancements, every contribution helps us explore the unknown. To contribute, simply fork this repository, make your changes, and initiate a pull request. The more, the merrier! Remember, together we can reach for the stars and beyond!

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. Feel free to take it for a spin around the galaxy! Just remember to buckle up and keep your hands and feet inside the spacecraft at all times.

## 🙏 Acknowledgements

- Special thanks to [Unsplash](https://unsplash.com/) for providing the stunning images that fuel our cosmic journey. Without their contributions, our project would be as dark and empty as the void of space.

- Hats off to the creators of Express.js, EJS, Tailwind CSS, and all the other stellar tools and libraries that power our cosmic adventure. With their help, we're reaching new heights and exploring new worlds with every line of code.