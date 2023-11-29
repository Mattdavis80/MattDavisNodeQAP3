-- Create the beer table.

-- Table: public.beer

-- DROP TABLE IF EXISTS public.beer;

CREATE TABLE IF NOT EXISTS public.beer
(
    abv integer NOT NULL,
    id integer NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    ibu integer NOT NULL,
    category_id integer NOT NULL,
    brewery_id integer NOT NULL,
    CONSTRAINT beer_pkey PRIMARY KEY (id),
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

ALTER TABLE IF EXISTS public.beer
    OWNER to postgres;