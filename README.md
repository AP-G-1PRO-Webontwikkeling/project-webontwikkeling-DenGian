# Programming Languages API

This API provides information about various programming languages along with related libraries. It offers details such as the name, description, age, birth date, genre, and related libraries for each programming language.

## Getting Started

To get started with using this API, you can follow the steps below:

### Prerequisites

- You need to have access to an HTTP client to make requests to the API endpoints.
- Ensure you have the necessary permissions to access the API.

### Installation

There's no installation required for using this API. Simply make HTTP requests to the provided endpoints.

### Usage

#### Retrieving Programming Languages

- **Endpoint**: `/programming-languages`
- **Method**: `GET`
- **Description**: Returns a list of programming languages along with their details.
- **Example**:
  ```bash
  curl -X GET https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-DenGian/main/assets/programming-languages.json
  ```

#### Retrieving Related Libraries

- **Endpoint**: `/related-libraries/:id`
- **Method**: `GET`
- **Description**: Returns the related library information for a specific programming language identified by its ID.
- **Parameters**:
  - `id`: The ID of the programming language.
- **Example**:
  ```bash
  curl -X GET https://raw.githubusercontent.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-DenGian/main/assets/related-libraries.json/LANG-001
  ```

### Response Format

The API returns data in JSON format. Here's an example response for retrieving programming languages:

```json
[
	{
		"id": "LANG-001",
		"name": "Python",
		"description": "Python is een veelzijdige programmeertaal die wordt gebruikt voor webontwikkeling, data-analyse, machine learning en meer.",
		"age": 31,
		"isActive": true,
		"birthDate": "1991-02-20",
		"imageUrl": "https://example.com/images/languages/python.jpg",
		"genre": "Algemeen doel",
		"relatedLibrary": {
			"id": "LIB-101",
			"name": "Django",
			"description": "Django is een high-level web framework geschreven in Python dat snel webontwikkeling mogelijk maakt.",
			"website": "https://www.djangoproject.com/",
			"stars": 50700,
			"latestVersion": "3.2.12"
		}
	}
	// More programming languages...
]
```

### Error Handling

The API follows standard HTTP status codes for error handling. For example, a `404 Not Found` status code will be returned if the requested resource does not exist.

## Contributors

- [Ian Mondelaers](https://github.com/DenGian) - Creator and maintainer
