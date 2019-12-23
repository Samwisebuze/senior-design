const k8s = require('@kubernetes/client-node')

const NAMESPACE = 'virtuoso-container-service'
const kc = new k8s.KubeConfig()
kc.loadFromDefault()
// const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

class K8Api {
    private static k8sApi = kc.makeApiClient(k8s.CoreV1Api)

    /**
     * Get a list of containers inside pods running inside
     * the namespace
     */
    static getPods(): any[] {
        return []
    }

    /**
     * Given a deploymentId, return a list of containers in that
     * deployment inside pods running inside the namespace
     * 
     * @param deploymentId
     * @returns any[]
     */
    static getDeploymentPods(deploymentId: string): any[] {
        return []
    }
}
