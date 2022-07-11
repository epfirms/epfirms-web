#!/usr/bin/python3

import sys
import os
from re import sub

def camel_case(s):
  s = sub(r"(_|-)+", " ", s).title().replace(" ", "")
  return ''.join([s[0].lower(), s[1:]])



module_name = sys.argv[1]
base_path = f"../src/modules/{module_name}/"
sub_directories = ["controllers", "routes", "services", "tests"]
camel_case_name = camel_case(module_name)
pascal_case = module_name.replace('-',' ').title().replace(' ','')
snake_case = module_name.replace('-','_').lower().replace(' ','')

index_template = f"""
import {{ {pascal_case}Controller }} from './{module_name}.controller';

const {camel_case_name}Controller = new {pascal_case}Controller();

export  {{{camel_case_name}Controller}};
"""

controller_template = f"""
import {{ Response, Request }} from 'express';
import {{ StatusConstants }} from '@src/constants/StatusConstants';
import {{ {pascal_case}Service }} from '@modules/{module_name}/services/{module_name}.service';
import {{ Service }} from 'typedi';

@Service()
export class {pascal_case}Controller {{
  constructor() {{}}

    public async create(req : Request, res : Response) : Promise<any> {{
        try {{
                const created = await {pascal_case}Service.create(req.body);
                res.status(StatusConstants.CREATED).send(created);
        }}
        catch (error){{

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }}
    }}


    public async update(req : Request, res : Response) : Promise<any> {{
        try {{
                const updated = await {pascal_case}Service.update(req.body);
                res.status(StatusConstants.CREATED).send(updated);
        }}
        catch (error){{

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }}
    }}
  
    public async delete(req : Request, res : Response) : Promise<any> {{
        try {{

            const deleted = await {pascal_case}Service.delete(req.params.id);
            res.status(StatusConstants.OK).send(true);
        }}
        catch (error){{
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }}
    }}

public async getOneWithId(req : Request, res : Response) : Promise<any> {{
        try {{

            const one = await {pascal_case}Service.getOneWithId(req.params.id);
            res.status(StatusConstants.OK).send(one);
        }}
        catch (error){{
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }}
    }}
}}


"""

routes_template = f"""
import express from 'express';
import {{ {camel_case_name}Controller}} from '@modules/{module_name}/controllers';

const passport = require('passport');

const {camel_case_name}Router = express.Router();

{camel_case_name}Router.post('/', passport.authenticate('bearer', {{ session: false }}), (req, res) => {camel_case_name}Controller.create(req, res));

{camel_case_name}Router.put('/', passport.authenticate('bearer', {{ session: false }}), (req, res) => {camel_case_name}Controller.update(req, res));
{camel_case_name}Router.get('/:id', passport.authenticate('bearer', {{ session: false }}), (req, res) => {camel_case_name}Controller.getOneWithId(req, res));
{camel_case_name}Router.delete('/:id', passport.authenticate('bearer', {{ session: false }}), (req, res) => {camel_case_name}Controller.delete(req, res));



export {{ {camel_case_name}Router }};



"""

service_template = f"""
import {{ Database }} from '@src/core/Database';
import {{ Service }} from 'typedi';

@Service()
export class {pascal_case}Service {{
     public static async create(data) : Promise<any> {{
        try {{

            const created = await Database.models.{snake_case}.create(data);
            return Promise.resolve(created);
        }}
        catch (error){{
            console.error(error)
        }}
    }}
  
     public static async update(data) : Promise<any> {{
        try {{

            const updated = await Database.models.{snake_case}.update(data, {{ where: {{id: data.id}} }});
            return Promise.resolve(updated);
        }}
        catch (error){{
            console.error(error)
        }}
    }}
    public static async delete(id) : Promise<any> {{
        try {{

            const deleted = await Database.models.{snake_case}.destroy({{where: {{id: id}}}});
            return Promise.resolve(deleted);
        }}
        catch (error){{
            console.error(error)
        }}
    }}

public static async getOneWithId(id) : Promise<any> {{
        try {{

            const one = await Database.models.{snake_case}.findOne({{where: {{id: id}}}});
            return Promise.resolve(one);
        }}
        catch (error){{
            console.error(error)
        }}
    }}
}}



"""

for dir in sub_directories:
    os.makedirs(base_path + dir)

with open(f"{base_path}controllers/index.ts", "w") as f:
    f.write(index_template)

with open(f"{base_path}controllers/{module_name}.controller.ts", "w") as f:
    f.write(controller_template)

with open(f"{base_path}routes/index.ts", "w") as f:
    f.write(routes_template)

with open(f"{base_path}services/{module_name}.service.ts", "w") as f:
    f.write(service_template)


print(f"Generating Module: {module_name} complete.")
print("Don't forget to register new Models in the database.ts!")