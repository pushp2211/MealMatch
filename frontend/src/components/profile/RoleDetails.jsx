import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

function RoleDetails({ formData, setFormData, isEditing }){
    return(
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  {formData.role === 'provider'
                    ? 'Provider Details'
                    : 'Seeker Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.role === 'provider' ? (
                  <>
                    <div className="space-y-2">
                      <Label>Provider Type</Label>
                      {isEditing ? (
                        <Select
                          value={formData.providerType || ''}
                          onValueChange={(value) =>
                            setFormData({ ...formData, providerType: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="mess">Mess / Canteen</SelectItem>
                            <SelectItem value="individual">Individual</SelectItem>
                            <SelectItem value="event">Event / Catering</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="h-10 px-3 border rounded-md bg-muted/30 flex items-center capitalize">
                          {formData.providerType || 'Not specified'}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Organization Name</Label>
                      {isEditing ? (
                        <Input
                          value={formData.organizationName || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              organizationName: e.target.value,
                            })
                          }
                          placeholder="Enter organization name (if applicable)"
                        />
                      ) : (
                        <div className="h-10 px-3 border rounded-md bg-muted/30 flex items-center">
                          {formData.organizationName || 'Not specified'}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label>Seeker Type</Label>
                    {isEditing ? (
                      <Select
                        value={formData.seekerType || ''}
                        onValueChange={(value) =>
                          setFormData({ ...formData, seekerType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="ngo">NGO</SelectItem>
                          <SelectItem value="shelter">Shelter</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="h-10 px-3 border rounded-md bg-muted/30 flex items-center capitalize">
                        {formData.seekerType || 'Not specified'}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
    )
}

export default RoleDetails;