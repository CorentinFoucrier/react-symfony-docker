FROM chialab/php-dev:7.3-apache

ENV APACHE_DOCUMENT_ROOT /var/www/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y gnupg \
    && apt-get install -y nodejs \
    && apt-get install -y yarn \
    && apt-get install -y locales

RUN apt-get clean && rm -rf /var/lib/apt/lists/* \
    && echo fr_FR.UTF-8 UTF-8 > /etc/locale.gen && locale-gen

WORKDIR /var/www