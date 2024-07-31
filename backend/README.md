
# Installation

To begin, run the following command to install the project dependencies:

`composer install`

# Edit .env

Next, open the .env file and add your database credentials. If necessary, you can also change the application URL in this file.

# Run Migrations

To create the required database tables, run the migration command:

`php artisan migrate`
`php artisan db:seed`
# Start the Local Server

Finally, start the local server using the following command:

`php artisan serve`

Now you should be able to access the Laravel API project locally.

<h1>TODO api</h1>


<ol type="1">
<li>Each model accepts valid relationship with <strong>_embed[]</strong> string in query. Example.com/categories?_embed[]=labels</li>
<li>There's both, sort and order methods implemented in this api. <strong>Sort</strong> implements with <strong>_sort="value"</strong> default value is title</li>
<li><strong>_order="value"</strong> default value is ascending, valid values are asc/desc</li>
<li>Api also have function to limit data per page - <strong>_per_page="integer"</strong> Default is 10</li>
</ol>
