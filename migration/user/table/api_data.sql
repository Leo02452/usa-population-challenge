CREATE TABLE IF NOT EXISTS ${schema:raw}.api_data (
	id bigserial NOT NULL,
	"is_active" bool NOT NULL DEFAULT true,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    "is_deleted" bool NOT NULL DEFAULT false,
    "deleted_at" timestamptz NULL,

	api_name text NULL,
	doc_id text NULL,
	doc_name text NULL,
	doc_record jsonb NOT NULL DEFAULT '[]'::json,
    
	PRIMARY KEY (id)
)
WITH (
	OIDS=FALSE
);