"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const MarissaInterviewProject = require("../lib/marissa-interview-project-stack");
test('Stack exists as expected', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new MarissaInterviewProject.MarissaInterviewProjectStack(app, 'MyTestStack');
    // THEN
    assert_1.expect(stack).to(assert_1.matchTemplate({
        "Resources": {
            "VanityNumbers9448E191": {
                "Type": "AWS::DynamoDB::Table",
                "Properties": {
                    "KeySchema": [
                        {
                            "AttributeName": "PHONE_NUMBER",
                            "KeyType": "HASH"
                        },
                        {
                            "AttributeName": "TIMESTAMP",
                            "KeyType": "RANGE"
                        }
                    ],
                    "AttributeDefinitions": [
                        {
                            "AttributeName": "PHONE_NUMBER",
                            "AttributeType": "S"
                        },
                        {
                            "AttributeName": "TIMESTAMP",
                            "AttributeType": "N"
                        }
                    ],
                    "ProvisionedThroughput": {
                        "ReadCapacityUnits": 5,
                        "WriteCapacityUnits": 5
                    }
                },
                "UpdateReplacePolicy": "Delete",
                "DeletionPolicy": "Delete"
            },
            "VanitiesHandlerServiceRole46BCF9E5": {
                "Type": "AWS::IAM::Role",
                "Properties": {
                    "AssumeRolePolicyDocument": {
                        "Statement": [
                            {
                                "Action": "sts:AssumeRole",
                                "Effect": "Allow",
                                "Principal": {
                                    "Service": "lambda.amazonaws.com"
                                }
                            }
                        ],
                        "Version": "2012-10-17"
                    },
                    "ManagedPolicyArns": [
                        {
                            "Fn::Join": [
                                "",
                                [
                                    "arn:",
                                    {
                                        "Ref": "AWS::Partition"
                                    },
                                    ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
                                ]
                            ]
                        }
                    ]
                }
            },
            "VanitiesHandlerServiceRoleDefaultPolicyCADD368C": {
                "Type": "AWS::IAM::Policy",
                "Properties": {
                    "PolicyDocument": {
                        "Statement": [
                            {
                                "Action": [
                                    "dynamodb:BatchWriteItem",
                                    "dynamodb:PutItem",
                                    "dynamodb:UpdateItem",
                                    "dynamodb:DeleteItem"
                                ],
                                "Effect": "Allow",
                                "Resource": [
                                    {
                                        "Fn::GetAtt": [
                                            "VanityNumbers9448E191",
                                            "Arn"
                                        ]
                                    },
                                    {
                                        "Ref": "AWS::NoValue"
                                    }
                                ]
                            }
                        ],
                        "Version": "2012-10-17"
                    },
                    "PolicyName": "VanitiesHandlerServiceRoleDefaultPolicyCADD368C",
                    "Roles": [
                        {
                            "Ref": "VanitiesHandlerServiceRole46BCF9E5"
                        }
                    ]
                }
            },
            "VanitiesHandlerADAFC9C2": {
                "Type": "AWS::Lambda::Function",
                "Properties": {
                    "Code": {
                        "S3Bucket": {
                            "Ref": "AssetParameters0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625S3BucketAE978150"
                        },
                        "S3Key": {
                            "Fn::Join": [
                                "",
                                [
                                    {
                                        "Fn::Select": [
                                            0,
                                            {
                                                "Fn::Split": [
                                                    "||",
                                                    {
                                                        "Ref": "AssetParameters0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625S3VersionKeyF3FD71D8"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "Fn::Select": [
                                            1,
                                            {
                                                "Fn::Split": [
                                                    "||",
                                                    {
                                                        "Ref": "AssetParameters0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625S3VersionKeyF3FD71D8"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            ]
                        }
                    },
                    "Role": {
                        "Fn::GetAtt": [
                            "VanitiesHandlerServiceRole46BCF9E5",
                            "Arn"
                        ]
                    },
                    "Environment": {
                        "Variables": {
                            "VANITY_NUMBERS_TABLE": {
                                "Ref": "VanityNumbers9448E191"
                            }
                        }
                    },
                    "Handler": "vanities.handler",
                    "Runtime": "nodejs12.x"
                },
                "DependsOn": [
                    "VanitiesHandlerServiceRoleDefaultPolicyCADD368C",
                    "VanitiesHandlerServiceRole46BCF9E5"
                ]
            },
            "LastFiveHandlerServiceRole8D838C15": {
                "Type": "AWS::IAM::Role",
                "Properties": {
                    "AssumeRolePolicyDocument": {
                        "Statement": [
                            {
                                "Action": "sts:AssumeRole",
                                "Effect": "Allow",
                                "Principal": {
                                    "Service": "lambda.amazonaws.com"
                                }
                            }
                        ],
                        "Version": "2012-10-17"
                    },
                    "ManagedPolicyArns": [
                        {
                            "Fn::Join": [
                                "",
                                [
                                    "arn:",
                                    {
                                        "Ref": "AWS::Partition"
                                    },
                                    ":iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
                                ]
                            ]
                        }
                    ]
                }
            },
            "LastFiveHandlerServiceRoleDefaultPolicy187ACC3B": {
                "Type": "AWS::IAM::Policy",
                "Properties": {
                    "PolicyDocument": {
                        "Statement": [
                            {
                                "Action": [
                                    "dynamodb:BatchGetItem",
                                    "dynamodb:GetRecords",
                                    "dynamodb:GetShardIterator",
                                    "dynamodb:Query",
                                    "dynamodb:GetItem",
                                    "dynamodb:Scan",
                                    "dynamodb:ConditionCheckItem"
                                ],
                                "Effect": "Allow",
                                "Resource": [
                                    {
                                        "Fn::GetAtt": [
                                            "VanityNumbers9448E191",
                                            "Arn"
                                        ]
                                    },
                                    {
                                        "Ref": "AWS::NoValue"
                                    }
                                ]
                            }
                        ],
                        "Version": "2012-10-17"
                    },
                    "PolicyName": "LastFiveHandlerServiceRoleDefaultPolicy187ACC3B",
                    "Roles": [
                        {
                            "Ref": "LastFiveHandlerServiceRole8D838C15"
                        }
                    ]
                }
            },
            "LastFiveHandler732DFC20": {
                "Type": "AWS::Lambda::Function",
                "Properties": {
                    "Code": {
                        "S3Bucket": {
                            "Ref": "AssetParameters0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625S3BucketAE978150"
                        },
                        "S3Key": {
                            "Fn::Join": [
                                "",
                                [
                                    {
                                        "Fn::Select": [
                                            0,
                                            {
                                                "Fn::Split": [
                                                    "||",
                                                    {
                                                        "Ref": "AssetParameters0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625S3VersionKeyF3FD71D8"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "Fn::Select": [
                                            1,
                                            {
                                                "Fn::Split": [
                                                    "||",
                                                    {
                                                        "Ref": "AssetParameters0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625S3VersionKeyF3FD71D8"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            ]
                        }
                    },
                    "Role": {
                        "Fn::GetAtt": [
                            "LastFiveHandlerServiceRole8D838C15",
                            "Arn"
                        ]
                    },
                    "Environment": {
                        "Variables": {
                            "VANITY_NUMBERS_TABLE": {
                                "Ref": "VanityNumbers9448E191"
                            }
                        }
                    },
                    "Handler": "last5calls.handler",
                    "Runtime": "nodejs12.x"
                },
                "DependsOn": [
                    "LastFiveHandlerServiceRoleDefaultPolicy187ACC3B",
                    "LastFiveHandlerServiceRole8D838C15"
                ]
            },
            "EndpointEEF1FD8F": {
                "Type": "AWS::ApiGateway::RestApi",
                "Properties": {
                    "Name": "Endpoint"
                }
            },
            "EndpointCloudWatchRoleC3C64E0F": {
                "Type": "AWS::IAM::Role",
                "Properties": {
                    "AssumeRolePolicyDocument": {
                        "Statement": [
                            {
                                "Action": "sts:AssumeRole",
                                "Effect": "Allow",
                                "Principal": {
                                    "Service": "apigateway.amazonaws.com"
                                }
                            }
                        ],
                        "Version": "2012-10-17"
                    },
                    "ManagedPolicyArns": [
                        {
                            "Fn::Join": [
                                "",
                                [
                                    "arn:",
                                    {
                                        "Ref": "AWS::Partition"
                                    },
                                    ":iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs"
                                ]
                            ]
                        }
                    ]
                }
            },
            "EndpointAccountB8304247": {
                "Type": "AWS::ApiGateway::Account",
                "Properties": {
                    "CloudWatchRoleArn": {
                        "Fn::GetAtt": [
                            "EndpointCloudWatchRoleC3C64E0F",
                            "Arn"
                        ]
                    }
                },
                "DependsOn": [
                    "EndpointEEF1FD8F"
                ]
            },
            "EndpointDeployment318525DAb043293b15d45ba3947c31e3de0c5dc3": {
                "Type": "AWS::ApiGateway::Deployment",
                "Properties": {
                    "RestApiId": {
                        "Ref": "EndpointEEF1FD8F"
                    },
                    "Description": "Automatically created by the RestApi construct"
                },
                "DependsOn": [
                    "EndpointproxyANYC09721C5",
                    "Endpointproxy39E2174E",
                    "EndpointANY485C938B"
                ]
            },
            "EndpointDeploymentStageprodB78BEEA0": {
                "Type": "AWS::ApiGateway::Stage",
                "Properties": {
                    "RestApiId": {
                        "Ref": "EndpointEEF1FD8F"
                    },
                    "DeploymentId": {
                        "Ref": "EndpointDeployment318525DAb043293b15d45ba3947c31e3de0c5dc3"
                    },
                    "StageName": "prod"
                }
            },
            "Endpointproxy39E2174E": {
                "Type": "AWS::ApiGateway::Resource",
                "Properties": {
                    "ParentId": {
                        "Fn::GetAtt": [
                            "EndpointEEF1FD8F",
                            "RootResourceId"
                        ]
                    },
                    "PathPart": "{proxy+}",
                    "RestApiId": {
                        "Ref": "EndpointEEF1FD8F"
                    }
                }
            },
            "EndpointproxyANYApiPermissionMyTestStackEndpoint695FDFAAANYproxyA3DADBF6": {
                "Type": "AWS::Lambda::Permission",
                "Properties": {
                    "Action": "lambda:InvokeFunction",
                    "FunctionName": {
                        "Fn::GetAtt": [
                            "LastFiveHandler732DFC20",
                            "Arn"
                        ]
                    },
                    "Principal": "apigateway.amazonaws.com",
                    "SourceArn": {
                        "Fn::Join": [
                            "",
                            [
                                "arn:",
                                {
                                    "Ref": "AWS::Partition"
                                },
                                ":execute-api:",
                                {
                                    "Ref": "AWS::Region"
                                },
                                ":",
                                {
                                    "Ref": "AWS::AccountId"
                                },
                                ":",
                                {
                                    "Ref": "EndpointEEF1FD8F"
                                },
                                "/",
                                {
                                    "Ref": "EndpointDeploymentStageprodB78BEEA0"
                                },
                                "/*/*"
                            ]
                        ]
                    }
                }
            },
            "EndpointproxyANYApiPermissionTestMyTestStackEndpoint695FDFAAANYproxy90B88BB5": {
                "Type": "AWS::Lambda::Permission",
                "Properties": {
                    "Action": "lambda:InvokeFunction",
                    "FunctionName": {
                        "Fn::GetAtt": [
                            "LastFiveHandler732DFC20",
                            "Arn"
                        ]
                    },
                    "Principal": "apigateway.amazonaws.com",
                    "SourceArn": {
                        "Fn::Join": [
                            "",
                            [
                                "arn:",
                                {
                                    "Ref": "AWS::Partition"
                                },
                                ":execute-api:",
                                {
                                    "Ref": "AWS::Region"
                                },
                                ":",
                                {
                                    "Ref": "AWS::AccountId"
                                },
                                ":",
                                {
                                    "Ref": "EndpointEEF1FD8F"
                                },
                                "/test-invoke-stage/*/*"
                            ]
                        ]
                    }
                }
            },
            "EndpointproxyANYC09721C5": {
                "Type": "AWS::ApiGateway::Method",
                "Properties": {
                    "HttpMethod": "ANY",
                    "ResourceId": {
                        "Ref": "Endpointproxy39E2174E"
                    },
                    "RestApiId": {
                        "Ref": "EndpointEEF1FD8F"
                    },
                    "AuthorizationType": "NONE",
                    "Integration": {
                        "IntegrationHttpMethod": "POST",
                        "Type": "AWS_PROXY",
                        "Uri": {
                            "Fn::Join": [
                                "",
                                [
                                    "arn:",
                                    {
                                        "Ref": "AWS::Partition"
                                    },
                                    ":apigateway:",
                                    {
                                        "Ref": "AWS::Region"
                                    },
                                    ":lambda:path/2015-03-31/functions/",
                                    {
                                        "Fn::GetAtt": [
                                            "LastFiveHandler732DFC20",
                                            "Arn"
                                        ]
                                    },
                                    "/invocations"
                                ]
                            ]
                        }
                    }
                }
            },
            "EndpointANYApiPermissionMyTestStackEndpoint695FDFAAANY7AA09D8D": {
                "Type": "AWS::Lambda::Permission",
                "Properties": {
                    "Action": "lambda:InvokeFunction",
                    "FunctionName": {
                        "Fn::GetAtt": [
                            "LastFiveHandler732DFC20",
                            "Arn"
                        ]
                    },
                    "Principal": "apigateway.amazonaws.com",
                    "SourceArn": {
                        "Fn::Join": [
                            "",
                            [
                                "arn:",
                                {
                                    "Ref": "AWS::Partition"
                                },
                                ":execute-api:",
                                {
                                    "Ref": "AWS::Region"
                                },
                                ":",
                                {
                                    "Ref": "AWS::AccountId"
                                },
                                ":",
                                {
                                    "Ref": "EndpointEEF1FD8F"
                                },
                                "/",
                                {
                                    "Ref": "EndpointDeploymentStageprodB78BEEA0"
                                },
                                "/*/"
                            ]
                        ]
                    }
                }
            },
            "EndpointANYApiPermissionTestMyTestStackEndpoint695FDFAAANY75707C47": {
                "Type": "AWS::Lambda::Permission",
                "Properties": {
                    "Action": "lambda:InvokeFunction",
                    "FunctionName": {
                        "Fn::GetAtt": [
                            "LastFiveHandler732DFC20",
                            "Arn"
                        ]
                    },
                    "Principal": "apigateway.amazonaws.com",
                    "SourceArn": {
                        "Fn::Join": [
                            "",
                            [
                                "arn:",
                                {
                                    "Ref": "AWS::Partition"
                                },
                                ":execute-api:",
                                {
                                    "Ref": "AWS::Region"
                                },
                                ":",
                                {
                                    "Ref": "AWS::AccountId"
                                },
                                ":",
                                {
                                    "Ref": "EndpointEEF1FD8F"
                                },
                                "/test-invoke-stage/*/"
                            ]
                        ]
                    }
                }
            },
            "EndpointANY485C938B": {
                "Type": "AWS::ApiGateway::Method",
                "Properties": {
                    "HttpMethod": "ANY",
                    "ResourceId": {
                        "Fn::GetAtt": [
                            "EndpointEEF1FD8F",
                            "RootResourceId"
                        ]
                    },
                    "RestApiId": {
                        "Ref": "EndpointEEF1FD8F"
                    },
                    "AuthorizationType": "NONE",
                    "Integration": {
                        "IntegrationHttpMethod": "POST",
                        "Type": "AWS_PROXY",
                        "Uri": {
                            "Fn::Join": [
                                "",
                                [
                                    "arn:",
                                    {
                                        "Ref": "AWS::Partition"
                                    },
                                    ":apigateway:",
                                    {
                                        "Ref": "AWS::Region"
                                    },
                                    ":lambda:path/2015-03-31/functions/",
                                    {
                                        "Fn::GetAtt": [
                                            "LastFiveHandler732DFC20",
                                            "Arn"
                                        ]
                                    },
                                    "/invocations"
                                ]
                            ]
                        }
                    }
                }
            }
        },
        "Parameters": {
            "AssetParameters0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625S3BucketAE978150": {
                "Type": "String",
                "Description": "S3 bucket for asset \"0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625\""
            },
            "AssetParameters0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625S3VersionKeyF3FD71D8": {
                "Type": "String",
                "Description": "S3 key for asset version \"0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625\""
            },
            "AssetParameters0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625ArtifactHash1C0B7B1E": {
                "Type": "String",
                "Description": "Artifact hash for asset \"0813b9415c60f884dc276eba128d6b9ed42fa15a1236709ecc6c7af5c1ad7625\""
            }
        },
        "Outputs": {
            "Endpoint8024A810": {
                "Value": {
                    "Fn::Join": [
                        "",
                        [
                            "https://",
                            {
                                "Ref": "EndpointEEF1FD8F"
                            },
                            ".execute-api.",
                            {
                                "Ref": "AWS::Region"
                            },
                            ".",
                            {
                                "Ref": "AWS::URLSuffix"
                            },
                            "/",
                            {
                                "Ref": "EndpointDeploymentStageprodB78BEEA0"
                            },
                            "/"
                        ]
                    ]
                }
            }
        }
    }, assert_1.MatchStyle.EXACT));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyaXNzYS1pbnRlcnZpZXctcHJvamVjdC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFyaXNzYS1pbnRlcnZpZXctcHJvamVjdC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQWlGO0FBQ2pGLHFDQUFxQztBQUNyQyxrRkFBa0Y7QUFFbEYsSUFBSSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxQixPQUFPO0lBQ1AsTUFBTSxLQUFLLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0YsT0FBTztJQUNQLGVBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsc0JBQWEsQ0FBQztRQUNoQyxXQUFXLEVBQUU7WUFDWCx1QkFBdUIsRUFBRTtnQkFDdkIsTUFBTSxFQUFFLHNCQUFzQjtnQkFDOUIsWUFBWSxFQUFFO29CQUNaLFdBQVcsRUFBRTt3QkFDWDs0QkFDRSxlQUFlLEVBQUUsY0FBYzs0QkFDL0IsU0FBUyxFQUFFLE1BQU07eUJBQ2xCO3dCQUNEOzRCQUNFLGVBQWUsRUFBRSxXQUFXOzRCQUM1QixTQUFTLEVBQUUsT0FBTzt5QkFDbkI7cUJBQ0Y7b0JBQ0Qsc0JBQXNCLEVBQUU7d0JBQ3RCOzRCQUNFLGVBQWUsRUFBRSxjQUFjOzRCQUMvQixlQUFlLEVBQUUsR0FBRzt5QkFDckI7d0JBQ0Q7NEJBQ0UsZUFBZSxFQUFFLFdBQVc7NEJBQzVCLGVBQWUsRUFBRSxHQUFHO3lCQUNyQjtxQkFDRjtvQkFDRCx1QkFBdUIsRUFBRTt3QkFDdkIsbUJBQW1CLEVBQUUsQ0FBQzt3QkFDdEIsb0JBQW9CLEVBQUUsQ0FBQztxQkFDeEI7aUJBQ0Y7Z0JBQ0QscUJBQXFCLEVBQUUsUUFBUTtnQkFDL0IsZ0JBQWdCLEVBQUUsUUFBUTthQUMzQjtZQUNE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LEVBQUUsYUFBYTtxQ0FDckI7b0NBQ0Qsb0NBQW9DO29DQUNwQzt3Q0FDRSxZQUFZLEVBQUU7NENBQ1oseUJBQXlCOzRDQUN6QixLQUFLO3lDQUNOO3FDQUNGO29DQUNELGNBQWM7aUNBQ2Y7NkJBQ0Y7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsWUFBWSxFQUFFO1lBQ1osaUdBQWlHLEVBQUU7Z0JBQ2pHLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixhQUFhLEVBQUUsMEZBQTBGO2FBQzFHO1lBQ0QscUdBQXFHLEVBQUU7Z0JBQ3JHLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixhQUFhLEVBQUUsK0ZBQStGO2FBQy9HO1lBQ0QscUdBQXFHLEVBQUU7Z0JBQ3JHLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixhQUFhLEVBQUUsOEZBQThGO2FBQzlHO1NBQ0Y7UUFDRCxTQUFTLEVBQUU7WUFDVCxrQkFBa0IsRUFBRTtnQkFDbEIsT0FBTyxFQUFFO29CQUNQLFVBQVUsRUFBRTt3QkFDVixFQUFFO3dCQUNGOzRCQUNFLFVBQVU7NEJBQ1Y7Z0NBQ0UsS0FBSyxFQUFFLGtCQUFrQjs2QkFDMUI7NEJBQ0QsZUFBZTs0QkFDZjtnQ0FDRSxLQUFLLEVBQUUsYUFBYTs2QkFDckI7NEJBQ0QsR0FBRzs0QkFDSDtnQ0FDRSxLQUFLLEVBQUUsZ0JBQWdCOzZCQUN4Qjs0QkFDRCxHQUFHOzRCQUNIO2dDQUNFLEtBQUssRUFBRSxxQ0FBcUM7NkJBQzdDOzRCQUNELEdBQUc7eUJBQ0o7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0YsRUFBRSxtQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDekIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBlY3QgYXMgZXhwZWN0Q0RLLCBtYXRjaFRlbXBsYXRlLCBNYXRjaFN0eWxlIH0gZnJvbSAnQGF3cy1jZGsvYXNzZXJ0JztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIE1hcmlzc2FJbnRlcnZpZXdQcm9qZWN0IGZyb20gJy4uL2xpYi9tYXJpc3NhLWludGVydmlldy1wcm9qZWN0LXN0YWNrJztcblxudGVzdCgnU3RhY2sgZXhpc3RzIGFzIGV4cGVjdGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gICAgLy8gV0hFTlxuICAgIGNvbnN0IHN0YWNrID0gbmV3IE1hcmlzc2FJbnRlcnZpZXdQcm9qZWN0Lk1hcmlzc2FJbnRlcnZpZXdQcm9qZWN0U3RhY2soYXBwLCAnTXlUZXN0U3RhY2snKTtcbiAgICAvLyBUSEVOXG4gICAgZXhwZWN0Q0RLKHN0YWNrKS50byhtYXRjaFRlbXBsYXRlKHtcbiAgICAgIFwiUmVzb3VyY2VzXCI6IHtcbiAgICAgICAgXCJWYW5pdHlOdW1iZXJzOTQ0OEUxOTFcIjoge1xuICAgICAgICAgIFwiVHlwZVwiOiBcIkFXUzo6RHluYW1vREI6OlRhYmxlXCIsXG4gICAgICAgICAgXCJQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIFwiS2V5U2NoZW1hXCI6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiQXR0cmlidXRlTmFtZVwiOiBcIlBIT05FX05VTUJFUlwiLFxuICAgICAgICAgICAgICAgIFwiS2V5VHlwZVwiOiBcIkhBU0hcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJBdHRyaWJ1dGVOYW1lXCI6IFwiVElNRVNUQU1QXCIsXG4gICAgICAgICAgICAgICAgXCJLZXlUeXBlXCI6IFwiUkFOR0VcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJBdHRyaWJ1dGVEZWZpbml0aW9uc1wiOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIkF0dHJpYnV0ZU5hbWVcIjogXCJQSE9ORV9OVU1CRVJcIixcbiAgICAgICAgICAgICAgICBcIkF0dHJpYnV0ZVR5cGVcIjogXCJTXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiQXR0cmlidXRlTmFtZVwiOiBcIlRJTUVTVEFNUFwiLFxuICAgICAgICAgICAgICAgIFwiQXR0cmlidXRlVHlwZVwiOiBcIk5cIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJQcm92aXNpb25lZFRocm91Z2hwdXRcIjoge1xuICAgICAgICAgICAgICBcIlJlYWRDYXBhY2l0eVVuaXRzXCI6IDUsXG4gICAgICAgICAgICAgIFwiV3JpdGVDYXBhY2l0eVVuaXRzXCI6IDVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiVXBkYXRlUmVwbGFjZVBvbGljeVwiOiBcIkRlbGV0ZVwiLFxuICAgICAgICAgIFwiRGVsZXRpb25Qb2xpY3lcIjogXCJEZWxldGVcIlxuICAgICAgICB9LFxuICAgICAgICBcIlZhbml0aWVzSGFuZGxlclNlcnZpY2VSb2xlNDZCQ0Y5RTVcIjoge1xuICAgICAgICAgIFwiVHlwZVwiOiBcIkFXUzo6SUFNOjpSb2xlXCIsXG4gICAgICAgICAgXCJQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIFwiQXNzdW1lUm9sZVBvbGljeURvY3VtZW50XCI6IHtcbiAgICAgICAgICAgICAgXCJTdGF0ZW1lbnRcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiQWN0aW9uXCI6IFwic3RzOkFzc3VtZVJvbGVcIixcbiAgICAgICAgICAgICAgICAgIFwiRWZmZWN0XCI6IFwiQWxsb3dcIixcbiAgICAgICAgICAgICAgICAgIFwiUHJpbmNpcGFsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJTZXJ2aWNlXCI6IFwibGFtYmRhLmFtYXpvbmF3cy5jb21cIlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJWZXJzaW9uXCI6IFwiMjAxMi0xMC0xN1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJNYW5hZ2VkUG9saWN5QXJuc1wiOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIkZuOjpKb2luXCI6IFtcbiAgICAgICAgICAgICAgICAgIFwiXCIsXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFwiYXJuOlwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBV1M6OlBhcnRpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiOmlhbTo6YXdzOnBvbGljeS9zZXJ2aWNlLXJvbGUvQVdTTGFtYmRhQmFzaWNFeGVjdXRpb25Sb2xlXCJcbiAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiVmFuaXRpZXNIYW5kbGVyU2VydmljZVJvbGVEZWZhdWx0UG9saWN5Q0FERDM2OENcIjoge1xuICAgICAgICAgIFwiVHlwZVwiOiBcIkFXUzo6SUFNOjpQb2xpY3lcIixcbiAgICAgICAgICBcIlByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgXCJQb2xpY3lEb2N1bWVudFwiOiB7XG4gICAgICAgICAgICAgIFwiU3RhdGVtZW50XCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcIkFjdGlvblwiOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZHluYW1vZGI6QmF0Y2hXcml0ZUl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJkeW5hbW9kYjpQdXRJdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZHluYW1vZGI6VXBkYXRlSXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICBcImR5bmFtb2RiOkRlbGV0ZUl0ZW1cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiRWZmZWN0XCI6IFwiQWxsb3dcIixcbiAgICAgICAgICAgICAgICAgIFwiUmVzb3VyY2VcIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJGbjo6R2V0QXR0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVmFuaXR5TnVtYmVyczk0NDhFMTkxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkFyblwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBV1M6Ok5vVmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcIlZlcnNpb25cIjogXCIyMDEyLTEwLTE3XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIlBvbGljeU5hbWVcIjogXCJWYW5pdGllc0hhbmRsZXJTZXJ2aWNlUm9sZURlZmF1bHRQb2xpY3lDQUREMzY4Q1wiLFxuICAgICAgICAgICAgXCJSb2xlc1wiOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIlZhbml0aWVzSGFuZGxlclNlcnZpY2VSb2xlNDZCQ0Y5RTVcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIlZhbml0aWVzSGFuZGxlckFEQUZDOUMyXCI6IHtcbiAgICAgICAgICBcIlR5cGVcIjogXCJBV1M6OkxhbWJkYTo6RnVuY3Rpb25cIixcbiAgICAgICAgICBcIlByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgXCJDb2RlXCI6IHtcbiAgICAgICAgICAgICAgXCJTM0J1Y2tldFwiOiB7XG4gICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBc3NldFBhcmFtZXRlcnMwODEzYjk0MTVjNjBmODg0ZGMyNzZlYmExMjhkNmI5ZWQ0MmZhMTVhMTIzNjcwOWVjYzZjN2FmNWMxYWQ3NjI1UzNCdWNrZXRBRTk3ODE1MFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiUzNLZXlcIjoge1xuICAgICAgICAgICAgICAgIFwiRm46OkpvaW5cIjogW1xuICAgICAgICAgICAgICAgICAgXCJcIixcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwiRm46OlNlbGVjdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkZuOjpTcGxpdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ8fFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiQXNzZXRQYXJhbWV0ZXJzMDgxM2I5NDE1YzYwZjg4NGRjMjc2ZWJhMTI4ZDZiOWVkNDJmYTE1YTEyMzY3MDllY2M2YzdhZjVjMWFkNzYyNVMzVmVyc2lvbktleUYzRkQ3MUQ4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIkZuOjpTZWxlY3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJGbjo6U3BsaXRcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwifHxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkFzc2V0UGFyYW1ldGVyczA4MTNiOTQxNWM2MGY4ODRkYzI3NmViYTEyOGQ2YjllZDQyZmExNWExMjM2NzA5ZWNjNmM3YWY1YzFhZDc2MjVTM1ZlcnNpb25LZXlGM0ZENzFEOFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJSb2xlXCI6IHtcbiAgICAgICAgICAgICAgXCJGbjo6R2V0QXR0XCI6IFtcbiAgICAgICAgICAgICAgICBcIlZhbml0aWVzSGFuZGxlclNlcnZpY2VSb2xlNDZCQ0Y5RTVcIixcbiAgICAgICAgICAgICAgICBcIkFyblwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIkVudmlyb25tZW50XCI6IHtcbiAgICAgICAgICAgICAgXCJWYXJpYWJsZXNcIjoge1xuICAgICAgICAgICAgICAgIFwiVkFOSVRZX05VTUJFUlNfVEFCTEVcIjoge1xuICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJWYW5pdHlOdW1iZXJzOTQ0OEUxOTFcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiSGFuZGxlclwiOiBcInZhbml0aWVzLmhhbmRsZXJcIixcbiAgICAgICAgICAgIFwiUnVudGltZVwiOiBcIm5vZGVqczEyLnhcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJEZXBlbmRzT25cIjogW1xuICAgICAgICAgICAgXCJWYW5pdGllc0hhbmRsZXJTZXJ2aWNlUm9sZURlZmF1bHRQb2xpY3lDQUREMzY4Q1wiLFxuICAgICAgICAgICAgXCJWYW5pdGllc0hhbmRsZXJTZXJ2aWNlUm9sZTQ2QkNGOUU1XCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiTGFzdEZpdmVIYW5kbGVyU2VydmljZVJvbGU4RDgzOEMxNVwiOiB7XG4gICAgICAgICAgXCJUeXBlXCI6IFwiQVdTOjpJQU06OlJvbGVcIixcbiAgICAgICAgICBcIlByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgXCJBc3N1bWVSb2xlUG9saWN5RG9jdW1lbnRcIjoge1xuICAgICAgICAgICAgICBcIlN0YXRlbWVudFwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJBY3Rpb25cIjogXCJzdHM6QXNzdW1lUm9sZVwiLFxuICAgICAgICAgICAgICAgICAgXCJFZmZlY3RcIjogXCJBbGxvd1wiLFxuICAgICAgICAgICAgICAgICAgXCJQcmluY2lwYWxcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIlNlcnZpY2VcIjogXCJsYW1iZGEuYW1hem9uYXdzLmNvbVwiXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcIlZlcnNpb25cIjogXCIyMDEyLTEwLTE3XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIk1hbmFnZWRQb2xpY3lBcm5zXCI6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiRm46OkpvaW5cIjogW1xuICAgICAgICAgICAgICAgICAgXCJcIixcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgXCJhcm46XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkFXUzo6UGFydGl0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCI6aWFtOjphd3M6cG9saWN5L3NlcnZpY2Utcm9sZS9BV1NMYW1iZGFCYXNpY0V4ZWN1dGlvblJvbGVcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJMYXN0Rml2ZUhhbmRsZXJTZXJ2aWNlUm9sZURlZmF1bHRQb2xpY3kxODdBQ0MzQlwiOiB7XG4gICAgICAgICAgXCJUeXBlXCI6IFwiQVdTOjpJQU06OlBvbGljeVwiLFxuICAgICAgICAgIFwiUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICBcIlBvbGljeURvY3VtZW50XCI6IHtcbiAgICAgICAgICAgICAgXCJTdGF0ZW1lbnRcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiQWN0aW9uXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJkeW5hbW9kYjpCYXRjaEdldEl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJkeW5hbW9kYjpHZXRSZWNvcmRzXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZHluYW1vZGI6R2V0U2hhcmRJdGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICBcImR5bmFtb2RiOlF1ZXJ5XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZHluYW1vZGI6R2V0SXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICBcImR5bmFtb2RiOlNjYW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJkeW5hbW9kYjpDb25kaXRpb25DaGVja0l0ZW1cIlxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIFwiRWZmZWN0XCI6IFwiQWxsb3dcIixcbiAgICAgICAgICAgICAgICAgIFwiUmVzb3VyY2VcIjogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJGbjo6R2V0QXR0XCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVmFuaXR5TnVtYmVyczk0NDhFMTkxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkFyblwiXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBV1M6Ok5vVmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcIlZlcnNpb25cIjogXCIyMDEyLTEwLTE3XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIlBvbGljeU5hbWVcIjogXCJMYXN0Rml2ZUhhbmRsZXJTZXJ2aWNlUm9sZURlZmF1bHRQb2xpY3kxODdBQ0MzQlwiLFxuICAgICAgICAgICAgXCJSb2xlc1wiOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkxhc3RGaXZlSGFuZGxlclNlcnZpY2VSb2xlOEQ4MzhDMTVcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIkxhc3RGaXZlSGFuZGxlcjczMkRGQzIwXCI6IHtcbiAgICAgICAgICBcIlR5cGVcIjogXCJBV1M6OkxhbWJkYTo6RnVuY3Rpb25cIixcbiAgICAgICAgICBcIlByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgXCJDb2RlXCI6IHtcbiAgICAgICAgICAgICAgXCJTM0J1Y2tldFwiOiB7XG4gICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBc3NldFBhcmFtZXRlcnMwODEzYjk0MTVjNjBmODg0ZGMyNzZlYmExMjhkNmI5ZWQ0MmZhMTVhMTIzNjcwOWVjYzZjN2FmNWMxYWQ3NjI1UzNCdWNrZXRBRTk3ODE1MFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiUzNLZXlcIjoge1xuICAgICAgICAgICAgICAgIFwiRm46OkpvaW5cIjogW1xuICAgICAgICAgICAgICAgICAgXCJcIixcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwiRm46OlNlbGVjdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcIkZuOjpTcGxpdFwiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ8fFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiQXNzZXRQYXJhbWV0ZXJzMDgxM2I5NDE1YzYwZjg4NGRjMjc2ZWJhMTI4ZDZiOWVkNDJmYTE1YTEyMzY3MDllY2M2YzdhZjVjMWFkNzYyNVMzVmVyc2lvbktleUYzRkQ3MUQ4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIkZuOjpTZWxlY3RcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJGbjo6U3BsaXRcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwifHxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkFzc2V0UGFyYW1ldGVyczA4MTNiOTQxNWM2MGY4ODRkYzI3NmViYTEyOGQ2YjllZDQyZmExNWExMjM2NzA5ZWNjNmM3YWY1YzFhZDc2MjVTM1ZlcnNpb25LZXlGM0ZENzFEOFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJSb2xlXCI6IHtcbiAgICAgICAgICAgICAgXCJGbjo6R2V0QXR0XCI6IFtcbiAgICAgICAgICAgICAgICBcIkxhc3RGaXZlSGFuZGxlclNlcnZpY2VSb2xlOEQ4MzhDMTVcIixcbiAgICAgICAgICAgICAgICBcIkFyblwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIkVudmlyb25tZW50XCI6IHtcbiAgICAgICAgICAgICAgXCJWYXJpYWJsZXNcIjoge1xuICAgICAgICAgICAgICAgIFwiVkFOSVRZX05VTUJFUlNfVEFCTEVcIjoge1xuICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJWYW5pdHlOdW1iZXJzOTQ0OEUxOTFcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiSGFuZGxlclwiOiBcImxhc3Q1Y2FsbHMuaGFuZGxlclwiLFxuICAgICAgICAgICAgXCJSdW50aW1lXCI6IFwibm9kZWpzMTIueFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIkRlcGVuZHNPblwiOiBbXG4gICAgICAgICAgICBcIkxhc3RGaXZlSGFuZGxlclNlcnZpY2VSb2xlRGVmYXVsdFBvbGljeTE4N0FDQzNCXCIsXG4gICAgICAgICAgICBcIkxhc3RGaXZlSGFuZGxlclNlcnZpY2VSb2xlOEQ4MzhDMTVcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJFbmRwb2ludEVFRjFGRDhGXCI6IHtcbiAgICAgICAgICBcIlR5cGVcIjogXCJBV1M6OkFwaUdhdGV3YXk6OlJlc3RBcGlcIixcbiAgICAgICAgICBcIlByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgXCJOYW1lXCI6IFwiRW5kcG9pbnRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJFbmRwb2ludENsb3VkV2F0Y2hSb2xlQzNDNjRFMEZcIjoge1xuICAgICAgICAgIFwiVHlwZVwiOiBcIkFXUzo6SUFNOjpSb2xlXCIsXG4gICAgICAgICAgXCJQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIFwiQXNzdW1lUm9sZVBvbGljeURvY3VtZW50XCI6IHtcbiAgICAgICAgICAgICAgXCJTdGF0ZW1lbnRcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiQWN0aW9uXCI6IFwic3RzOkFzc3VtZVJvbGVcIixcbiAgICAgICAgICAgICAgICAgIFwiRWZmZWN0XCI6IFwiQWxsb3dcIixcbiAgICAgICAgICAgICAgICAgIFwiUHJpbmNpcGFsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJTZXJ2aWNlXCI6IFwiYXBpZ2F0ZXdheS5hbWF6b25hd3MuY29tXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiVmVyc2lvblwiOiBcIjIwMTItMTAtMTdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiTWFuYWdlZFBvbGljeUFybnNcIjogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJGbjo6Sm9pblwiOiBbXG4gICAgICAgICAgICAgICAgICBcIlwiLFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBcImFybjpcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiQVdTOjpQYXJ0aXRpb25cIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcIjppYW06OmF3czpwb2xpY3kvc2VydmljZS1yb2xlL0FtYXpvbkFQSUdhdGV3YXlQdXNoVG9DbG91ZFdhdGNoTG9nc1wiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIkVuZHBvaW50QWNjb3VudEI4MzA0MjQ3XCI6IHtcbiAgICAgICAgICBcIlR5cGVcIjogXCJBV1M6OkFwaUdhdGV3YXk6OkFjY291bnRcIixcbiAgICAgICAgICBcIlByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgXCJDbG91ZFdhdGNoUm9sZUFyblwiOiB7XG4gICAgICAgICAgICAgIFwiRm46OkdldEF0dFwiOiBbXG4gICAgICAgICAgICAgICAgXCJFbmRwb2ludENsb3VkV2F0Y2hSb2xlQzNDNjRFMEZcIixcbiAgICAgICAgICAgICAgICBcIkFyblwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiRGVwZW5kc09uXCI6IFtcbiAgICAgICAgICAgIFwiRW5kcG9pbnRFRUYxRkQ4RlwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIkVuZHBvaW50RGVwbG95bWVudDMxODUyNURBYjA0MzI5M2IxNWQ0NWJhMzk0N2MzMWUzZGUwYzVkYzNcIjoge1xuICAgICAgICAgIFwiVHlwZVwiOiBcIkFXUzo6QXBpR2F0ZXdheTo6RGVwbG95bWVudFwiLFxuICAgICAgICAgIFwiUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICBcIlJlc3RBcGlJZFwiOiB7XG4gICAgICAgICAgICAgIFwiUmVmXCI6IFwiRW5kcG9pbnRFRUYxRkQ4RlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJEZXNjcmlwdGlvblwiOiBcIkF1dG9tYXRpY2FsbHkgY3JlYXRlZCBieSB0aGUgUmVzdEFwaSBjb25zdHJ1Y3RcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJEZXBlbmRzT25cIjogW1xuICAgICAgICAgICAgXCJFbmRwb2ludHByb3h5QU5ZQzA5NzIxQzVcIixcbiAgICAgICAgICAgIFwiRW5kcG9pbnRwcm94eTM5RTIxNzRFXCIsXG4gICAgICAgICAgICBcIkVuZHBvaW50QU5ZNDg1QzkzOEJcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJFbmRwb2ludERlcGxveW1lbnRTdGFnZXByb2RCNzhCRUVBMFwiOiB7XG4gICAgICAgICAgXCJUeXBlXCI6IFwiQVdTOjpBcGlHYXRld2F5OjpTdGFnZVwiLFxuICAgICAgICAgIFwiUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICBcIlJlc3RBcGlJZFwiOiB7XG4gICAgICAgICAgICAgIFwiUmVmXCI6IFwiRW5kcG9pbnRFRUYxRkQ4RlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJEZXBsb3ltZW50SWRcIjoge1xuICAgICAgICAgICAgICBcIlJlZlwiOiBcIkVuZHBvaW50RGVwbG95bWVudDMxODUyNURBYjA0MzI5M2IxNWQ0NWJhMzk0N2MzMWUzZGUwYzVkYzNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiU3RhZ2VOYW1lXCI6IFwicHJvZFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIkVuZHBvaW50cHJveHkzOUUyMTc0RVwiOiB7XG4gICAgICAgICAgXCJUeXBlXCI6IFwiQVdTOjpBcGlHYXRld2F5OjpSZXNvdXJjZVwiLFxuICAgICAgICAgIFwiUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICBcIlBhcmVudElkXCI6IHtcbiAgICAgICAgICAgICAgXCJGbjo6R2V0QXR0XCI6IFtcbiAgICAgICAgICAgICAgICBcIkVuZHBvaW50RUVGMUZEOEZcIixcbiAgICAgICAgICAgICAgICBcIlJvb3RSZXNvdXJjZUlkXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiUGF0aFBhcnRcIjogXCJ7cHJveHkrfVwiLFxuICAgICAgICAgICAgXCJSZXN0QXBpSWRcIjoge1xuICAgICAgICAgICAgICBcIlJlZlwiOiBcIkVuZHBvaW50RUVGMUZEOEZcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJFbmRwb2ludHByb3h5QU5ZQXBpUGVybWlzc2lvbk15VGVzdFN0YWNrRW5kcG9pbnQ2OTVGREZBQUFOWXByb3h5QTNEQURCRjZcIjoge1xuICAgICAgICAgIFwiVHlwZVwiOiBcIkFXUzo6TGFtYmRhOjpQZXJtaXNzaW9uXCIsXG4gICAgICAgICAgXCJQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIFwiQWN0aW9uXCI6IFwibGFtYmRhOkludm9rZUZ1bmN0aW9uXCIsXG4gICAgICAgICAgICBcIkZ1bmN0aW9uTmFtZVwiOiB7XG4gICAgICAgICAgICAgIFwiRm46OkdldEF0dFwiOiBbXG4gICAgICAgICAgICAgICAgXCJMYXN0Rml2ZUhhbmRsZXI3MzJERkMyMFwiLFxuICAgICAgICAgICAgICAgIFwiQXJuXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiUHJpbmNpcGFsXCI6IFwiYXBpZ2F0ZXdheS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgICAgICBcIlNvdXJjZUFyblwiOiB7XG4gICAgICAgICAgICAgIFwiRm46OkpvaW5cIjogW1xuICAgICAgICAgICAgICAgIFwiXCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgXCJhcm46XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiQVdTOjpQYXJ0aXRpb25cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiOmV4ZWN1dGUtYXBpOlwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkFXUzo6UmVnaW9uXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcIjpcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBV1M6OkFjY291bnRJZFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCI6XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiRW5kcG9pbnRFRUYxRkQ4RlwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCIvXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiRW5kcG9pbnREZXBsb3ltZW50U3RhZ2Vwcm9kQjc4QkVFQTBcIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiLyovKlwiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIkVuZHBvaW50cHJveHlBTllBcGlQZXJtaXNzaW9uVGVzdE15VGVzdFN0YWNrRW5kcG9pbnQ2OTVGREZBQUFOWXByb3h5OTBCODhCQjVcIjoge1xuICAgICAgICAgIFwiVHlwZVwiOiBcIkFXUzo6TGFtYmRhOjpQZXJtaXNzaW9uXCIsXG4gICAgICAgICAgXCJQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIFwiQWN0aW9uXCI6IFwibGFtYmRhOkludm9rZUZ1bmN0aW9uXCIsXG4gICAgICAgICAgICBcIkZ1bmN0aW9uTmFtZVwiOiB7XG4gICAgICAgICAgICAgIFwiRm46OkdldEF0dFwiOiBbXG4gICAgICAgICAgICAgICAgXCJMYXN0Rml2ZUhhbmRsZXI3MzJERkMyMFwiLFxuICAgICAgICAgICAgICAgIFwiQXJuXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiUHJpbmNpcGFsXCI6IFwiYXBpZ2F0ZXdheS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgICAgICBcIlNvdXJjZUFyblwiOiB7XG4gICAgICAgICAgICAgIFwiRm46OkpvaW5cIjogW1xuICAgICAgICAgICAgICAgIFwiXCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgXCJhcm46XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiQVdTOjpQYXJ0aXRpb25cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiOmV4ZWN1dGUtYXBpOlwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkFXUzo6UmVnaW9uXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcIjpcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBV1M6OkFjY291bnRJZFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCI6XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiRW5kcG9pbnRFRUYxRkQ4RlwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCIvdGVzdC1pbnZva2Utc3RhZ2UvKi8qXCJcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiRW5kcG9pbnRwcm94eUFOWUMwOTcyMUM1XCI6IHtcbiAgICAgICAgICBcIlR5cGVcIjogXCJBV1M6OkFwaUdhdGV3YXk6Ok1ldGhvZFwiLFxuICAgICAgICAgIFwiUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICBcIkh0dHBNZXRob2RcIjogXCJBTllcIixcbiAgICAgICAgICAgIFwiUmVzb3VyY2VJZFwiOiB7XG4gICAgICAgICAgICAgIFwiUmVmXCI6IFwiRW5kcG9pbnRwcm94eTM5RTIxNzRFXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIlJlc3RBcGlJZFwiOiB7XG4gICAgICAgICAgICAgIFwiUmVmXCI6IFwiRW5kcG9pbnRFRUYxRkQ4RlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uVHlwZVwiOiBcIk5PTkVcIixcbiAgICAgICAgICAgIFwiSW50ZWdyYXRpb25cIjoge1xuICAgICAgICAgICAgICBcIkludGVncmF0aW9uSHR0cE1ldGhvZFwiOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgXCJUeXBlXCI6IFwiQVdTX1BST1hZXCIsXG4gICAgICAgICAgICAgIFwiVXJpXCI6IHtcbiAgICAgICAgICAgICAgICBcIkZuOjpKb2luXCI6IFtcbiAgICAgICAgICAgICAgICAgIFwiXCIsXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFwiYXJuOlwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBV1M6OlBhcnRpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiOmFwaWdhdGV3YXk6XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkFXUzo6UmVnaW9uXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCI6bGFtYmRhOnBhdGgvMjAxNS0wMy0zMS9mdW5jdGlvbnMvXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIkZuOjpHZXRBdHRcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJMYXN0Rml2ZUhhbmRsZXI3MzJERkMyMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBcm5cIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCIvaW52b2NhdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJFbmRwb2ludEFOWUFwaVBlcm1pc3Npb25NeVRlc3RTdGFja0VuZHBvaW50Njk1RkRGQUFBTlk3QUEwOUQ4RFwiOiB7XG4gICAgICAgICAgXCJUeXBlXCI6IFwiQVdTOjpMYW1iZGE6OlBlcm1pc3Npb25cIixcbiAgICAgICAgICBcIlByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgXCJBY3Rpb25cIjogXCJsYW1iZGE6SW52b2tlRnVuY3Rpb25cIixcbiAgICAgICAgICAgIFwiRnVuY3Rpb25OYW1lXCI6IHtcbiAgICAgICAgICAgICAgXCJGbjo6R2V0QXR0XCI6IFtcbiAgICAgICAgICAgICAgICBcIkxhc3RGaXZlSGFuZGxlcjczMkRGQzIwXCIsXG4gICAgICAgICAgICAgICAgXCJBcm5cIlxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJQcmluY2lwYWxcIjogXCJhcGlnYXRld2F5LmFtYXpvbmF3cy5jb21cIixcbiAgICAgICAgICAgIFwiU291cmNlQXJuXCI6IHtcbiAgICAgICAgICAgICAgXCJGbjo6Sm9pblwiOiBbXG4gICAgICAgICAgICAgICAgXCJcIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBcImFybjpcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBV1M6OlBhcnRpdGlvblwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCI6ZXhlY3V0ZS1hcGk6XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiQVdTOjpSZWdpb25cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiOlwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkFXUzo6QWNjb3VudElkXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcIjpcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJFbmRwb2ludEVFRjFGRDhGXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcIi9cIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJFbmRwb2ludERlcGxveW1lbnRTdGFnZXByb2RCNzhCRUVBMFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCIvKi9cIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJFbmRwb2ludEFOWUFwaVBlcm1pc3Npb25UZXN0TXlUZXN0U3RhY2tFbmRwb2ludDY5NUZERkFBQU5ZNzU3MDdDNDdcIjoge1xuICAgICAgICAgIFwiVHlwZVwiOiBcIkFXUzo6TGFtYmRhOjpQZXJtaXNzaW9uXCIsXG4gICAgICAgICAgXCJQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIFwiQWN0aW9uXCI6IFwibGFtYmRhOkludm9rZUZ1bmN0aW9uXCIsXG4gICAgICAgICAgICBcIkZ1bmN0aW9uTmFtZVwiOiB7XG4gICAgICAgICAgICAgIFwiRm46OkdldEF0dFwiOiBbXG4gICAgICAgICAgICAgICAgXCJMYXN0Rml2ZUhhbmRsZXI3MzJERkMyMFwiLFxuICAgICAgICAgICAgICAgIFwiQXJuXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiUHJpbmNpcGFsXCI6IFwiYXBpZ2F0ZXdheS5hbWF6b25hd3MuY29tXCIsXG4gICAgICAgICAgICBcIlNvdXJjZUFyblwiOiB7XG4gICAgICAgICAgICAgIFwiRm46OkpvaW5cIjogW1xuICAgICAgICAgICAgICAgIFwiXCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgXCJhcm46XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiQVdTOjpQYXJ0aXRpb25cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFwiOmV4ZWN1dGUtYXBpOlwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkFXUzo6UmVnaW9uXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBcIjpcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBV1M6OkFjY291bnRJZFwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCI6XCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiRW5kcG9pbnRFRUYxRkQ4RlwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXCIvdGVzdC1pbnZva2Utc3RhZ2UvKi9cIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJFbmRwb2ludEFOWTQ4NUM5MzhCXCI6IHtcbiAgICAgICAgICBcIlR5cGVcIjogXCJBV1M6OkFwaUdhdGV3YXk6Ok1ldGhvZFwiLFxuICAgICAgICAgIFwiUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICBcIkh0dHBNZXRob2RcIjogXCJBTllcIixcbiAgICAgICAgICAgIFwiUmVzb3VyY2VJZFwiOiB7XG4gICAgICAgICAgICAgIFwiRm46OkdldEF0dFwiOiBbXG4gICAgICAgICAgICAgICAgXCJFbmRwb2ludEVFRjFGRDhGXCIsXG4gICAgICAgICAgICAgICAgXCJSb290UmVzb3VyY2VJZFwiXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIlJlc3RBcGlJZFwiOiB7XG4gICAgICAgICAgICAgIFwiUmVmXCI6IFwiRW5kcG9pbnRFRUYxRkQ4RlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uVHlwZVwiOiBcIk5PTkVcIixcbiAgICAgICAgICAgIFwiSW50ZWdyYXRpb25cIjoge1xuICAgICAgICAgICAgICBcIkludGVncmF0aW9uSHR0cE1ldGhvZFwiOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgXCJUeXBlXCI6IFwiQVdTX1BST1hZXCIsXG4gICAgICAgICAgICAgIFwiVXJpXCI6IHtcbiAgICAgICAgICAgICAgICBcIkZuOjpKb2luXCI6IFtcbiAgICAgICAgICAgICAgICAgIFwiXCIsXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIFwiYXJuOlwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBV1M6OlBhcnRpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiOmFwaWdhdGV3YXk6XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkFXUzo6UmVnaW9uXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCI6bGFtYmRhOnBhdGgvMjAxNS0wMy0zMS9mdW5jdGlvbnMvXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBcIkZuOjpHZXRBdHRcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJMYXN0Rml2ZUhhbmRsZXI3MzJERkMyMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBcm5cIlxuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCIvaW52b2NhdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiUGFyYW1ldGVyc1wiOiB7XG4gICAgICAgIFwiQXNzZXRQYXJhbWV0ZXJzMDgxM2I5NDE1YzYwZjg4NGRjMjc2ZWJhMTI4ZDZiOWVkNDJmYTE1YTEyMzY3MDllY2M2YzdhZjVjMWFkNzYyNVMzQnVja2V0QUU5NzgxNTBcIjoge1xuICAgICAgICAgIFwiVHlwZVwiOiBcIlN0cmluZ1wiLFxuICAgICAgICAgIFwiRGVzY3JpcHRpb25cIjogXCJTMyBidWNrZXQgZm9yIGFzc2V0IFxcXCIwODEzYjk0MTVjNjBmODg0ZGMyNzZlYmExMjhkNmI5ZWQ0MmZhMTVhMTIzNjcwOWVjYzZjN2FmNWMxYWQ3NjI1XFxcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQXNzZXRQYXJhbWV0ZXJzMDgxM2I5NDE1YzYwZjg4NGRjMjc2ZWJhMTI4ZDZiOWVkNDJmYTE1YTEyMzY3MDllY2M2YzdhZjVjMWFkNzYyNVMzVmVyc2lvbktleUYzRkQ3MUQ4XCI6IHtcbiAgICAgICAgICBcIlR5cGVcIjogXCJTdHJpbmdcIixcbiAgICAgICAgICBcIkRlc2NyaXB0aW9uXCI6IFwiUzMga2V5IGZvciBhc3NldCB2ZXJzaW9uIFxcXCIwODEzYjk0MTVjNjBmODg0ZGMyNzZlYmExMjhkNmI5ZWQ0MmZhMTVhMTIzNjcwOWVjYzZjN2FmNWMxYWQ3NjI1XFxcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQXNzZXRQYXJhbWV0ZXJzMDgxM2I5NDE1YzYwZjg4NGRjMjc2ZWJhMTI4ZDZiOWVkNDJmYTE1YTEyMzY3MDllY2M2YzdhZjVjMWFkNzYyNUFydGlmYWN0SGFzaDFDMEI3QjFFXCI6IHtcbiAgICAgICAgICBcIlR5cGVcIjogXCJTdHJpbmdcIixcbiAgICAgICAgICBcIkRlc2NyaXB0aW9uXCI6IFwiQXJ0aWZhY3QgaGFzaCBmb3IgYXNzZXQgXFxcIjA4MTNiOTQxNWM2MGY4ODRkYzI3NmViYTEyOGQ2YjllZDQyZmExNWExMjM2NzA5ZWNjNmM3YWY1YzFhZDc2MjVcXFwiXCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiT3V0cHV0c1wiOiB7XG4gICAgICAgIFwiRW5kcG9pbnQ4MDI0QTgxMFwiOiB7XG4gICAgICAgICAgXCJWYWx1ZVwiOiB7XG4gICAgICAgICAgICBcIkZuOjpKb2luXCI6IFtcbiAgICAgICAgICAgICAgXCJcIixcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFwiaHR0cHM6Ly9cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkVuZHBvaW50RUVGMUZEOEZcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCIuZXhlY3V0ZS1hcGkuXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJSZWZcIjogXCJBV1M6OlJlZ2lvblwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcIi5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcIlJlZlwiOiBcIkFXUzo6VVJMU3VmZml4XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiL1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiUmVmXCI6IFwiRW5kcG9pbnREZXBsb3ltZW50U3RhZ2Vwcm9kQjc4QkVFQTBcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCIvXCJcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIE1hdGNoU3R5bGUuRVhBQ1QpKVxufSk7XG4iXX0=