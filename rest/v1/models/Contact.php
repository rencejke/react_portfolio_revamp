<?php

Class Contact {
    public $contact_aid;
    public $contact_name;
    public $contact_email;
    public $contact_is_active;
    public $contact_subject;
    public $contact_message;
    public $contact_datetime;
    public $contact_created;

    public $contact_search;

    public $connection;
    public $lastInsertedId;
    public $tblContact;
    

    public function __construct($db) {
        $this->connection = $db;
        $this->tblContact = "contact";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblContact} ";
            $sql .= "(contact_name, ";
            $sql .= "contact_email, ";
            $sql .= "contact_subject, ";
            $sql .= "contact_message, ";
            $sql .= "contact_is_active, ";
            $sql .= "contact_created, ";
            $sql .= "contact_datetime ) values ( ";
            $sql .= ":contact_name, ";
            $sql .= ":contact_email, ";
            $sql .= ":contact_subject, ";
            $sql .= ":contact_message, ";
            $sql .= ":contact_is_active, ";
            $sql .= ":contact_created, ";
            $sql .= ":contact_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "contact_name" => $this->contact_name,
                "contact_email" => $this->contact_email,
                "contact_subject" => $this->contact_subject,
                "contact_message" => $this->contact_message,
                "contact_is_active" => $this->contact_is_active,
                "contact_created" => $this->contact_created,
                "contact_datetime" => $this->contact_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }

    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblContact} ";
            $sql .= "order by contact_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblContact} ";
            $sql .= "where contact_aid = :contact_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "contact_aid" => $this->contact_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblContact} set ";
            $sql .= "contact_name = :contact_name, ";
            $sql .= "contact_email = :contact_email, ";
            $sql .= "contact_subject = :contact_subject, ";
            $sql .= "contact_message = :contact_message	, ";
            $sql .= "contact_datetime = :contact_datetime ";
            $sql .= "where contact_aid  = :contact_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "contact_name" => $this->contact_name,
                "contact_email" => $this->contact_email,
                "contact_subject" => $this->contact_subject,
                "contact_message" => $this->contact_message,
                "contact_datetime" => $this->contact_datetime,
                "contact_aid" => $this->contact_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblContact} set ";
            $sql .= "contact_is_active = :contact_is_active, ";
            $sql .= "contact_datetime = :contact_datetime ";
            $sql .= "where contact_aid  = :contact_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "contact_is_active" => $this->contact_is_active,
                "contact_datetime" => $this->contact_datetime,
                "contact_aid" => $this->contact_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //new
    public function search()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblContact} ";
            $sql .= "where contact_title like :contact_title ";
            $sql .= "order by contact_is_active desc, ";
            $sql .= "contact_title_1 asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "contact_title_1" => "%{$this->contact_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}