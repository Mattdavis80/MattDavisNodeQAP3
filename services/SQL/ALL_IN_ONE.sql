-- Database: breweries

-- DROP DATABASE IF EXISTS breweries;

CREATE DATABASE breweries
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_Canada.1252'
    LC_CTYPE = 'English_Canada.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;



    -- Creating the categories table.

-- Table: public.categories

-- DROP TABLE IF EXISTS public.categories;

CREATE TABLE IF NOT EXISTS public.categories
(
    id integer NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categories
    OWNER to postgres;


    -- Creating the breweries table.

-- Table: public.breweries

-- DROP TABLE IF EXISTS public.breweries;

CREATE TABLE IF NOT EXISTS public.breweries
(
    id integer NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    city character varying COLLATE pg_catalog."default" NOT NULL,
    year_established integer NOT NULL,
    owner character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT breweries_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.breweries
    OWNER to postgres;


    -- Create the beer table.

-- Table: public.beers

-- DROP TABLE IF EXISTS public.beers;

CREATE TABLE IF NOT EXISTS public.beers
(
    id serial NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    abv integer NOT NULL,
    ibu integer NOT NULL,
    category_id integer NOT NULL,
    brewery_id integer NOT NULL,
    CONSTRAINT beers_pkey PRIMARY KEY (id),
    CONSTRAINT brewery_id FOREIGN KEY (brewery_id)
        REFERENCES public.breweries (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT category_id FOREIGN KEY (category_id)
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.beers
    OWNER to postgres;


    -- Insert statements for table `categories_info`

INSERT INTO public.categories (id, name, description) 
VALUES 
  (1, 'Lager', 'A type of beer that is conditioned at low temperatures, often with a clean, crisp taste.'),
  (2, 'IPA', 'India Pale Ale known for its hoppy and often fruity flavor.'),
  (3, 'Stout', 'A dark, rich beer with flavors of roasted malt, coffee, and chocolate.'),
  (4, 'Wheat Beer', 'Brewed with a significant proportion of wheat, often light and refreshing.'),
  (5, 'Sour Beer', 'Beers with a deliberately sour taste, often achieved through fermentation with wild yeast strains.'),
  (6, 'Pale Ale', 'A hop-forward beer with a pale color and balanced malt sweetness.'),
  (7, 'Porter', 'A dark beer with flavors of chocolate, coffee, and caramel.'),
  (8, 'Belgian Ale', 'A diverse range of ales with fruity, spicy, and complex flavors.'),
  (9, 'Amber Ale', 'A medium-bodied beer with a balance of malt sweetness and hop bitterness.'),
  (10, 'Pilsner', 'A pale, crisp lager with a noticeable hop bitterness.');


-- Insert information into the breweries table:

INSERT INTO public.breweries (id, name, city, year_established, owner) 
VALUES 
  (1, 'Hoppy Haven Brewing', 'Hopsville', 2010, 'John Hopson'),
  (2, 'Crafty Brews Co.', 'Brewburg', 2015, 'Alice Craftman'),
  (3, 'Riverfront Brews', 'River City', 2008, 'Charlie Rivers'),
  (4, 'Mountain Top Brew House', 'Summitville', 2012, 'Olivia Peaks'),
  (5, 'Golden Grain Brewery', 'Harvest Town', 2016, 'Ethan Fields'),
  (6, 'City Lights Brewing', 'Metroville', 2014, 'Mia Illumina'),
  (7, 'Harbor Hops Brewery', 'Seascape', 2011, 'Sammy Seafoam'),
  (8, 'Aloha Ales Co.', 'Island Paradise', 2017, 'Lulu Leilani'),
  (9, 'Urban Oasis Brewing', 'Downtown Oasis', 2013, 'Oscar Urbano'),
  (10, 'Mystic Moon Brewery', 'Enchanted Valley', 2009, 'Serena Starlight');


  
-- Inserting 30 fictional beers with names, abv, ibu, category_id, and brewery_id values
INSERT INTO public.beers (id, name, abv, ibu, category_id, brewery_id) VALUES 
  (1, 'Hoppy Lager', 5, 30, 1, 1),
  (2, 'Bold IPA', 6, 50, 2, 2),
  (3, 'Dark Roast Stout', 7, 40, 3, 3),
  (4, 'Wheat Delight', 5, 20, 4, 4),
  (5, 'Zesty Sour', 4, 15, 5, 5),
  (6, 'Pale Bliss', 5, 35, 6, 6),
  (7, 'Chocolate Porter', 6, 25, 7, 7),
  (8, 'Belgian Harmony', 7, 30, 8, 8),
  (9, 'Amber Elegance', 5, 28, 9, 9),
  (10, 'Crisp Pilsner', 4, 22, 10, 10),
  (11, 'Hoppy Delight', 6, 40, 3, 2),
  (12, 'Citrus Burst IPA', 5, 25, 7, 4),
  (13, 'Golden Lager', 7, 30, 1, 7),
  (14, 'Summer Wheat', 4, 20, 6, 9),
  (15, 'Tropical Zing Sour', 6, 35, 2, 5),
  (16, 'Smooth Pale Ale', 5, 28, 9, 8),
  (17, 'Velvet Chocolate Porter', 7, 22, 10, 3),
  (18, 'Triple Belgian Bliss', 4, 15, 5, 1),
  (19, 'Autumn Amber', 6, 30, 8, 6),
  (20, 'Crisp Winter Pilsner', 5, 18, 4, 10);

