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