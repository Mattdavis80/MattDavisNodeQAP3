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