PGDMP      &                }            bancoSuperMercado    17.4    17.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16626    bancoSuperMercado    DATABASE     �   CREATE DATABASE "bancoSuperMercado" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
 #   DROP DATABASE "bancoSuperMercado";
                     postgres    false            �            1259    16628 	   categoria    TABLE     [   CREATE TABLE public.categoria (
    id integer NOT NULL,
    nome character varying(50)
);
    DROP TABLE public.categoria;
       public         heap r       postgres    false            �            1259    16627    categoria_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.categoria_id_seq;
       public               postgres    false    218            	           0    0    categoria_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;
          public               postgres    false    217            �            1259    16635    produto    TABLE     �   CREATE TABLE public.produto (
    id integer NOT NULL,
    nome character varying(50),
    preco real,
    validade date,
    id_categoria integer
);
    DROP TABLE public.produto;
       public         heap r       postgres    false            �            1259    16634    produto_id_seq    SEQUENCE     �   CREATE SEQUENCE public.produto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.produto_id_seq;
       public               postgres    false    220            
           0    0    produto_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.produto_id_seq OWNED BY public.produto.id;
          public               postgres    false    219            �            1259    16647    venda    TABLE     �   CREATE TABLE public.venda (
    id integer NOT NULL,
    data timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total real
);
    DROP TABLE public.venda;
       public         heap r       postgres    false            �            1259    16646    venda_id_seq    SEQUENCE     �   CREATE SEQUENCE public.venda_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.venda_id_seq;
       public               postgres    false    222                       0    0    venda_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.venda_id_seq OWNED BY public.venda.id;
          public               postgres    false    221            a           2604    16631    categoria id    DEFAULT     l   ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);
 ;   ALTER TABLE public.categoria ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            b           2604    16638 
   produto id    DEFAULT     h   ALTER TABLE ONLY public.produto ALTER COLUMN id SET DEFAULT nextval('public.produto_id_seq'::regclass);
 9   ALTER TABLE public.produto ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            c           2604    16650    venda id    DEFAULT     d   ALTER TABLE ONLY public.venda ALTER COLUMN id SET DEFAULT nextval('public.venda_id_seq'::regclass);
 7   ALTER TABLE public.venda ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            �          0    16628 	   categoria 
   TABLE DATA           -   COPY public.categoria (id, nome) FROM stdin;
    public               postgres    false    218   �                  0    16635    produto 
   TABLE DATA           J   COPY public.produto (id, nome, preco, validade, id_categoria) FROM stdin;
    public               postgres    false    220   *                 0    16647    venda 
   TABLE DATA           0   COPY public.venda (id, data, total) FROM stdin;
    public               postgres    false    222   �                  0    0    categoria_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.categoria_id_seq', 2, true);
          public               postgres    false    217                       0    0    produto_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.produto_id_seq', 3, true);
          public               postgres    false    219                       0    0    venda_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.venda_id_seq', 2, true);
          public               postgres    false    221            f           2606    16633    categoria categoria_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categoria_pkey;
       public                 postgres    false    218            h           2606    16640    produto produto_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.produto DROP CONSTRAINT produto_pkey;
       public                 postgres    false    220            j           2606    16653    venda venda_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.venda
    ADD CONSTRAINT venda_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.venda DROP CONSTRAINT venda_pkey;
       public                 postgres    false    222            k           2606    16641 !   produto produto_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.produto
    ADD CONSTRAINT produto_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categoria(id);
 K   ALTER TABLE ONLY public.produto DROP CONSTRAINT produto_id_categoria_fkey;
       public               postgres    false    218    4710    220            �   #   x�3�t���M�+�/�2�tJM�LI,����� s��          c   x�3�t,*ʯRp*J�K�W0�N�42�4202�50"NC.#ΠԴ���T���T���D#N�*]C#�*#.cN��̬Ë��f�A�0����� �#         ?   x�=ɱ�0����$b�Y��������3�ClT�	�\����4xze���@���p��bF     