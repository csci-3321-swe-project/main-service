import {Express, Request, Response} from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import {version} from '../../package.json'

const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Trinity Register Docs",
            version
        },
        components:{
            securitySchemas:{
                bearerAuth:{
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            security: {
                bearerAuth: []
            }
        }
    },
    apis: ['./src/routes/*.ts','./src/utilities/schemas.ts']
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express, port: number){
    // Sawgger page
    app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    //Docs in JSON format
    app.get('docs.json',(req, res) => {
        res.setHeader('Content-type','application/json')
        res.send(swaggerSpec)
    })

    console.log(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs